import patients from '../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getEntryById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getEntries,
  getEntryById,
  getNonSensitiveEntries,
  addPatient
};