import express from "express";

const router = express.Router();
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

export default router;