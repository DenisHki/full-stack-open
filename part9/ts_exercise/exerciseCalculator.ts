import { isNotNumber } from "./utils";

export interface Results {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

export const parseArguments = (args: string[]): { daily_exercises: number[], target: number, } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = Number(args[2]);
  const daily_exercises = args.slice(3).map(Number);

  if (isNotNumber(target) || daily_exercises.some(isNotNumber)) {
    throw new Error("All arguments must be numbers.");
  }
  return { daily_exercises, target };
};

export const calculateExercises = (daily_exercises: number[], target: number): Results => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((n) => n > 0).length;
  const total = daily_exercises.reduce((acc, n) => acc + n, 0);
  const average = total / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = "excellent! You are doing great";
  } else if (average >= target * 0.5 && average < target * 1.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you should practice more :(";
  }

  const results: Results = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return results;
};

if (require.main === module) {
  try {
    const { daily_exercises, target } = parseArguments(process.argv);
    const result = calculateExercises(daily_exercises, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
