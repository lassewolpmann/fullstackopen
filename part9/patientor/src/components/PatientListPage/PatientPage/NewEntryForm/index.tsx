import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId, Patient } from "../../../../types.ts";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";

import HealthCheck from "./HealthCheck";
import diagnosisService from "../../../../services/diagnoses.ts";
import patientService from "../../../../services/patients.ts";
import Hospital from "./Hospital";
import Occupational from "./Occupational";

interface Props {
  id: string,
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
  setNotification: React.Dispatch<React.SetStateAction<string | null>>,
  setNotificationStatus: React.Dispatch<React.SetStateAction<string | null>>
}

const NewEntryForm = (props: Props) => {
  const { id, patient, setPatient, setNotification, setNotificationStatus } = props;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<string>('Hospital');

  const toggleForm = () => setFormVisible(!formVisible);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value);
  };

  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [codes, setCodes] = useState<string[]>([]);

  // Health Check
  const [rating, setRating] = useState<string>('');

  // Hospital
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCondition, setDischargeCondition] = useState<string>('');

  // Occupational
  const [employer, setEmployer] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  useEffect(() => {
    diagnosisService.getAll()
      .then(res => setDiagnoses(res));
  }, []);

  const resetValues = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setCodes([]);
    setRating('');
    setDischargeDate('');
    setDischargeCondition('');
    setEmployer('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
  };

  const handleCodeChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;

    setCodes(typeof value === 'string' ? value.split(',') : value);
    console.log(codes);
  };

  const handleReset = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    resetValues();
    toggleForm();
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    let object: EntryWithoutId;

    switch (entryType) {
      case "Hospital":
        object = {
          date: date,
          description: description,
          specialist: specialist,
          diagnosisCodes: codes,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCondition
          }
        };

        break;
      case "OccupationalHealthcare":
        object = {
          date: date,
          description: description,
          specialist: specialist,
          diagnosisCodes: codes,
          type: 'OccupationalHealthcare',
          employerName: employer
        };

        if (sickLeaveStart !== '' && sickLeaveEnd !== '') {
          object.sickLeave = {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          };
        }

        break;
      case "HealthCheck":
        object = {
          date: date,
          description: description,
          specialist: specialist,
          diagnosisCodes: codes,
          type: 'HealthCheck',
          healthCheckRating: Number(rating)
        };

        break;
      default:
        console.log('Invalid Entry Type');

        return;
    }

    patientService.createEntry(object, id)
      .then(data => {
        setPatient({
          ...patient,
          entries: patient.entries.concat(data)
        });

        setNotification('Added Entry');
        setNotificationStatus('success');
        resetValues();
      })
      .catch(error => {
        console.log(error);
        setNotification(error.response.data);
        setNotificationStatus('error');
      });

    setTimeout(() => {
      setNotification(null);
      setNotificationStatus(null);
    }, 5000);
  };

  if (!formVisible) {
    return (
      <Button onClick={toggleForm} variant="outlined">add new entry</Button>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <FormControl fullWidth>
            <InputLabel id="entry-type-label">Entry Type</InputLabel>
            <Select
              margin="dense"
              labelId="entry-type-label"
              id="entry-type-select"
              value={entryType}
              label="Entry Type"
              onChange={handleTypeChange}
            >
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
              <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
              <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            margin="dense"
            fullWidth
            value={description}
            onChange={(event => setDescription(event.target.value))}
            required
          />

          <TextField
            type="date"
            label="Date"
            margin="dense"
            fullWidth
            value={date}
            onChange={(event => setDate(event.target.value))}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Specialist"
            margin="dense"
            fullWidth
            value={specialist}
            onChange={(event => setSpecialist(event.target.value))}
            required
          />

          <FormControl fullWidth>
            <InputLabel id="diagnosis-code-label">Diagnosis codes</InputLabel>
            <Select
              margin="dense"
              labelId="diagnosis-code-label"
              id="diagnosis-code-select"
              label="Diagnosis codes"
              multiple
              value={codes}
              onChange={handleCodeChange}
            >
              {diagnoses.map(d => (
                <MenuItem
                  key={d.code}
                  value={d.code}
                >
                  {d.code} - {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {entryType === 'Hospital' && <Hospital dischargeDate={dischargeDate} setDischargeDate={setDischargeDate} dischargeCondition={dischargeCondition} setDischargeCondition={setDischargeCondition} />}
          {entryType === 'OccupationalHealthcare' && <Occupational employer={employer} setEmployer={setEmployer} sickLeaveStart={sickLeaveStart} setSickLeaveStart={setSickLeaveStart} sickLeaveEnd={sickLeaveEnd} setSickLeaveEnd={setSickLeaveEnd} />}
          {entryType === 'HealthCheck' && <HealthCheck rating={rating} setRating={setRating} />}

          <Grid container spacing={2}>
            <Grid item>
              <Button type="submit" variant="contained" color="success">add entry</Button>
            </Grid>
            <Grid item>
              <Button type="reset" variant="contained" color="error">cancel</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
};

export default NewEntryForm;