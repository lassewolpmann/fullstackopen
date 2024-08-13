import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../../types.ts";
import patientService from "../../../services/patients.ts";
import diagnosesService from "../../../services/diagnoses.ts";
import EntryListing from "./EntryListing";
import NewEntryForm from "./NewEntryForm";
import Notification from "./Notification";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);
  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getById(id)
        .then(res => setPatient(res));

      diagnosesService.getAll()
        .then(res => setDiagnoses(res));
    }
  }, [id]);

  if (!patient || !diagnoses || !id) {
    return (
      <h1>Patient not found.</h1>
    );
  }

  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px 0'
  };

  return (
    <div>
      <Notification notification={notification} status={notificationStatus} />
      <h1>{patient.name}
        {patient.gender === 'male' && <MaleIcon />}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'other' && <TransgenderIcon />}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <NewEntryForm id={id} patient={patient} setPatient={setPatient} setNotification={setNotification} setNotificationStatus={setNotificationStatus} />
      <h2>entries</h2>
      {patient.entries.map(entry => (
        <div style={style} key={entry.id}><EntryListing entry={entry} /></div>
      ))}
    </div>
  );
};

export default PatientPage;