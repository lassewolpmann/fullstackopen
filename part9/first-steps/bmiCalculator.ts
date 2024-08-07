export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  let range = "";
  if (bmi < 18.5) {
    range = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    range = "Normal";
  } else if (bmi >= 25 && bmi < 30) {
    range = "Overweight";
  } else if (bmi >= 30) {
    range = "Obese";
  } else {
    range = "Invalid";
  }

  return `${range} range`;
};