import React from "react";
import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string,
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
  dischargeCondition: string,
  setDischargeCondition: React.Dispatch<React.SetStateAction<string>>
}

const Hospital = (props: Props) => {
  const {
    dischargeDate,
    setDischargeDate,
    dischargeCondition,
    setDischargeCondition
  } = props;

  return (
    <>
      <TextField
        type="date"
        InputLabelProps={{ shrink: true }}
        label="Discharge Date"
        margin="dense"
        fullWidth
        required
        value={dischargeDate}
        onChange={(event => setDischargeDate(event.target.value))}
      />

      <TextField
        label="Discharge Condition"
        margin="dense"
        fullWidth
        required
        value={dischargeCondition}
        onChange={(event => setDischargeCondition(event.target.value))}
      />
    </>
  );
};

export default Hospital;