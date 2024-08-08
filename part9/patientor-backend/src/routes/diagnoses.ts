import express from "express";

const router = express.Router();
import data from '../data/diagnoses';

router.get('/', (_req, res) => {
  res.status(200).json(data);
});

export default router;