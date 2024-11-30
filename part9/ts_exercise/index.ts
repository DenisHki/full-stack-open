import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import express from "express";

const app = express();

app.use(express.json());



app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height ? Number(req.query.height) : NaN;
  const weight = req.query.weight ? Number(req.query.weight) : NaN;
  
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.status(200).json(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
