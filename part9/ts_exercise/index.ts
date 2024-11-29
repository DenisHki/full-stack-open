import { calculateBmi } from "./bmiCalculator";
import express, { Request, Response } from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
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
      weight: Number(req.query.height),
      height: Number(req.query.weight),
      bmi: bmi,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
