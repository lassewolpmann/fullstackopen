import express from "express";

const router = express.Router();
import patientService from '../services/patientService';
import utils from "../utils";

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
    const newPatientEntry = utils.toNewPatientEntry(req.body);
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

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);

    const { id } = req.params;
    const patient = patientService.getEntryById(id);

    if (patient) {
      const addedEntry = patientService.addEntryToPatient(patient, newEntry);
      res.status(201).json(addedEntry);
    } else {
      res.status(404).send(`Patient with ID ${id} not found.`);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;