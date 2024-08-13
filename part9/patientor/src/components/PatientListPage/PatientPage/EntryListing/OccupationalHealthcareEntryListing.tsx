import { OccupationalHealthcareEntry } from "../../../../types.ts";
import DiagnosisListing from "./DiagnosisListing";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryListing = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <>
      <h3>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></h3>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}><DiagnosisListing code={code} /></li>
        ))}
      </ul>

      <p>diagnosed by {entry.specialist}</p>
    </>
  );
};

export default OccupationalHealthcareEntryListing;