import { HospitalEntry } from "../../../../types.ts";
import DiagnosisListing from "./DiagnosisListing";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryListing = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <h3>{entry.date} <LocalHospitalIcon /></h3>
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

export default HospitalEntryListing;