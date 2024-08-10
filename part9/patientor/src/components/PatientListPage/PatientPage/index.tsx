import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from "react";
import { Patient } from "../../../types.ts";
import { apiBaseUrl } from "../../../constants.ts";
import axios from "axios";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then(res => setPatient(res.data));
  }, [id]);

  if (!patient) {
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
    </div>
  );
};

export default PatientPage;