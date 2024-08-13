import React, { BaseSyntheticEvent, useState } from "react";
import patientService from "../../../../services/patients.ts";
import { EntryWithoutId, Patient } from "../../../../types.ts";
import { Button, TextField } from "@mui/material";

interface Props {
  id: string,
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
  setNotification: React.Dispatch<React.SetStateAction<string | null>>,
  setNotificationStatus: React.Dispatch<React.SetStateAction<string | null>>
}

const NewEntryForm = (props: Props) => {
  const { id, patient, setPatient, setNotification, setNotificationStatus } = props;

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [codes, setCodes] = useState<string>('');


  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px 0'
  };

  const toggleForm = () => setFormVisible(!formVisible);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const object: EntryWithoutId = {
      date: date,
      description: description,
      specialist: specialist,
      type: "HealthCheck",
      healthCheckRating: Number(rating),
      diagnosisCodes: codes.split(',')
    };

    patientService.createEntry(object, id)
      .then(data => {
        setPatient({
          ...patient,
          entries: patient.entries.concat(data)
        });

        setNotification('Added Entry');
        setNotificationStatus('success');

        toggleForm();
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setCodes('');
      })
      .catch(error => {
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
      <form style={style} onReset={toggleForm} onSubmit={handleSubmit}>
        <h2>New HealthCheck entry</h2>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(event => setDescription(event.target.value))}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={(event => setDate(event.target.value))}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(event => setSpecialist(event.target.value))}
        />
        <TextField
          label="Rating"
          fullWidth
          value={rating}
          onChange={(event => setRating(event.target.value))}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={codes}
          onChange={(event => setCodes(event.target.value))}
        />

        <Button type="reset" variant="contained" color="error">cancel</Button>
        <Button type="submit" variant="contained" color="success">add entry</Button>
      </form>
    );
  }
};

export default NewEntryForm;