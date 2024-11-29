export interface PersonData {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): PersonData => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    return "Invalid height or weight.";
  }
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Underweight";
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const result = calculateBmi(height, weight);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
