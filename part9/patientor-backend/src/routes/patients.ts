import express from "express";

const router = express.Router();
import patientService from '../services/patientService';
import toNewPatientEntry from "../utils";

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getEntryById(id);

  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404).send(`Patient with ID ${id} not found.`);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;