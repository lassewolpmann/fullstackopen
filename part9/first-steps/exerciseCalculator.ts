export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface ExerciseValues {
  daily_exercises: number[]
  target: number
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const period = hours.length;
  const trainingDays = hours.filter((hour: number): boolean => hour !== 0).length;
  const average = hours.reduce((acc, cur) => acc + cur) / period;

  let rating = 0;
  let ratingDesc = '';

  if (average < (target - target / 10)) {
    rating = 1;
    ratingDesc = 'you did not reach your target';
  } else if (average < target) {
    rating = 2;
    ratingDesc = 'you almost reached your target!';
  } else if (average < (target + target / 10)) {
    rating = 3;
    ratingDesc = 'you reached your target!';
  } else if (average > (target + target / 10)) {
    rating = 2;
    ratingDesc = 'you overreached your target, take it a bit easier next time';
  }

  return {
    periodLength: period,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: average
  };
};