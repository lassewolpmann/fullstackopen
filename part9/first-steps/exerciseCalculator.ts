interface ExerciseValues {
  hours: number[]
  target: number
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const values = args.slice(2)
  const areValuesNan: boolean[] = values.map((value) => isNaN(Number(value)))

  if (areValuesNan.includes(true)) {
    throw new Error('At least one provided value is not a number!')
  }

  const hours = values.map((value) => Number(value))
  const target = hours.pop()

  return {
    hours: hours,
    target: target
  }
}

const calculateExercises = (hours: number[], target: number): Result => {
  const period = hours.length
  const trainingDays = hours.filter((hour: number): boolean => hour !== 0).length
  const average = hours.reduce((acc, cur) => acc + cur) / period

  let rating = 0
  let ratingDesc = ''

  if (average < (target - target / 10)) {
    rating = 1
    ratingDesc = 'you did not reach your target'
  } else if (average < target) {
    rating = 2
    ratingDesc = 'you almost reached your target!'
  } else if (average < (target + target / 10)) {
    rating = 3
    ratingDesc = 'you reached your target!'
  } else if (average > (target + target / 10)) {
    rating = 2
    ratingDesc = 'you overreached your target, take it a bit easier next time'
  }

  return {
    periodLength: period,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: average
  }
}

try {
  const { hours, target } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
