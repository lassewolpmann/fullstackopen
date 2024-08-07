interface BmiCalcValues {
  height: number,
  weight: number
}

const parseBmiArguments = (args: string[]): BmiCalcValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)

  let range = ""
  if (bmi < 18.5) {
    range = "Underweight"
  } else if (bmi >= 18.5 && bmi < 25) {
    range = "Normal"
  } else if (bmi >= 25 && bmi < 30) {
    range = "Overweight"
  } else if (bmi >= 30) {
    range = "Obese"
  } else {
    range = "Invalid"
  }

  return `${range} range`
}

try {
  const { height, weight } = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

