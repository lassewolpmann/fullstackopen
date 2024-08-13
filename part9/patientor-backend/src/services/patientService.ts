import patients from '../data/patients';
import { Entry, EntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
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

const addEntryToPatient = (patient: Patient, entry: EntryWithoutId) => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patients.forEach(p => {
    if (p.id === patient.id) {
      p.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getEntries,
  getEntryById,
  getNonSensitiveEntries,
  addPatient,
  addEntryToPatient
};