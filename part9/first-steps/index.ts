import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseValues, Result } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: "height or weight parameter is missing" });
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "height or weight parameter is not a number "});
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.status(200).json({
      height: height,
      weight: weight,
      bmi: bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseValues;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
  } else if (daily_exercises.map((value) => isNaN(Number(value))).includes(true) || daily_exercises.length === 0) {
    res.status(400).json({ error: "malformatted parameters "});
  } else {
    const result: Result = calculateExercises(daily_exercises, target);
    res.status(200).json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});