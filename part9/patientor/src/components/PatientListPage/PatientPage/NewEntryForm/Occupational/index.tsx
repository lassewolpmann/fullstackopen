import React from "react";
import { TextField } from "@mui/material";

interface Props {
  employer: string,
  setEmployer: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveStart: string,
  setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveEnd: string,
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>
}

const Occupational = (props: Props) => {
  const {
    employer,
    setEmployer,
    sickLeaveStart,
    setSickLeaveStart,
    sickLeaveEnd,
    setSickLeaveEnd
  } = props;

  return (
    <>
      <TextField
        label="Employer"
        fullWidth
        value={employer}
        onChange={(event => setEmployer(event.target.value))}
      />

      <TextField
        label="Sick Leave Start Date"
        fullWidth
        value={sickLeaveStart}
        onChange={(event => setSickLeaveStart(event.target.value))}
      />

      <TextField
        label="Sick Leave End Date"
        fullWidth
        value={sickLeaveEnd}
        onChange={(event => setSickLeaveEnd(event.target.value))}
      />
    </>
  );
};

export default Occupational;