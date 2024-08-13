import { Diagnosis, EntryWithoutId, Gender, HealthCheckRating, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  const values = Object.values(HealthCheckRating).filter(h => !isNaN(Number(h)));
  return rating in values;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error('Incorrect or missing Date');
  }

  if (!isValidDate(date)) {
    throw new Error('Incorrect or missing Date. Enter in YYYY-MM-DD format.');
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occ: unknown): string => {
  if (!isString(occ)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occ;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing occupation');
  }

  return ssn;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing description');
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseType = (type: unknown): string => {
  if (!isString(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseEmployer = (employer: unknown): string => {
  if (!isString(employer)) {
    throw new Error('Incorrect or missing employer');
  }

  return employer;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (isNaN(Number(rating)) || !isHealthCheckRating(Number(rating))) {
    throw new Error('Incorrect or missing Health Check Rating');
  }

  return HealthCheckRating.Healthy;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: []
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  // Checking the required fields for BaseEntry
  if ('date' in object && 'type' in object && 'specialist' in object && 'description' in object) {
    const entry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
      diagnosisCodes: parseDiagnosisCodes(object)
    };

    if (object.type === "Hospital") {
      if ('discharge' in object) {
        if (!object.discharge || typeof object.discharge !== 'object') {
          throw new Error('Incorrect or missing data for discharge');
        }

        if ('date' in object.discharge && 'criteria' in object.discharge) {
          return {
            ...entry,
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseCriteria(object.discharge.criteria)
            }
          };
        } else {
          throw new Error('Date and/or criteria Field missing');
        }
      } else {
        throw new Error('Discharge Field missing');
      }
    } else if (object.type === "OccupationalHealthcare") {
      if ('employerName' in object && 'sickLeave' in object) {
        if (!object.sickLeave || typeof object.sickLeave !== 'object') {
          throw new Error('Incorrect or missing data for sick leave');
        }

        if ('startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
          return {
            ...entry,
            employerName: parseEmployer(object.employerName),
            sickLeave: {
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate)
            }
          };
        } else {
          throw new Error('Start- and/or End date missing');
        }
      } else {
        throw new Error('Employer Name and/or Sick Leave missing');
      }
    } else if (object.type === "HealthCheck") {
      if ('healthCheckRating' in object) {
        return {
          ...entry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      } else {
        throw new Error('Health Check Rating is missing');
      }
    } else {
      throw new Error('Incorrect type for Entry');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatientEntry, toNewEntry };