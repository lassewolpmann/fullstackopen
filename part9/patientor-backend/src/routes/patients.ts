import express from "express";

const router = express.Router();
import patientService from '../services/patientService';
import { NewPatientEntry } from "../types";

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, occupation, ssn, dateOfBirth, gender } = req.body as NewPatientEntry;
  const addedEntry = patientService.addPatient({ name, occupation, ssn, dateOfBirth, gender });

  res.status(201).json(addedEntry);
});

export default router;