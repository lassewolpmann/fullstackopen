import { HealthCheckEntry } from "../../../../types.ts";
import DiagnosisListing from "./DiagnosisListing";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryListing = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <h3>{entry.date} <EventRepeatIcon /></h3>
      <p><i>{entry.description}</i></p>
      {entry.healthCheckRating === 0 && <FavoriteIcon style={{ color: 'green' }} />}
      {entry.healthCheckRating === 1 && <FavoriteIcon style={{ color: 'yellow' }} />}
      {entry.healthCheckRating === 2 && <FavoriteIcon style={{ color: 'red' }} />}
      {entry.healthCheckRating === 3 && <FavoriteIcon style={{ color: 'black' }} />}

      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}><DiagnosisListing code={code} /></li>
        ))}
      </ul>

      <p>diagnosed by {entry.specialist}</p>
    </>
  );
};

export default HealthCheckEntryListing;