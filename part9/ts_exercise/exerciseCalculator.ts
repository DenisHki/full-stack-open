interface Results {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (hours: number[], target: number): Results => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((n) => n > 0).length;
  const total = hours.reduce((acc, n) => acc + n, 0);
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

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
