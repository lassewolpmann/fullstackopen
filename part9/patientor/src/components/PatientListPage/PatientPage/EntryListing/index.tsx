import { Entry } from "../../../../types.ts";
import HospitalEntryListing from "./HospitalEntryListing.tsx";
import OccupationalHealthcareEntryListing from "./OccupationalHealthcareEntryListing.tsx";
import HealthCheckEntryListing from "./HealthCheckEntryListing.tsx";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryListing = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryListing entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryListing entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryListing entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryListing;