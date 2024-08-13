import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../../types.ts";
import patientService from "../../../services/patients.ts";
import diagnosesService from "../../../services/diagnoses.ts";
import DiagnosisListing from "./DiagnosisListing";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getById(id)
        .then(res => setPatient(res));

      diagnosesService.getAll()
        .then(res => setDiagnoses(res));
    }
  }, [id]);

  if (!patient || !diagnoses) {
    return (
      <h1>Patient not found.</h1>
    );
  }

  return (
    <div>
      <h1>{patient.name}
        {patient.gender === 'male' && <MaleIcon />}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'other' && <TransgenderIcon />}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} <i>{entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}><DiagnosisListing code={code} /></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;