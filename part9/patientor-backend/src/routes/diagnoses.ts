import express from "express";

const router = express.Router();
import diagnosisService from '../services/diagnosisService';

router.get('/', (_req, res) => {
  res.status(200).json(diagnosisService.getEntries());
});

export default router;