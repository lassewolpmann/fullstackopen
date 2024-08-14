import { TextField } from "@mui/material";
import React from "react";

interface Props {
  rating: string,
  setRating:  React.Dispatch<React.SetStateAction<string>>
}

const HealthCheck = (props: Props) => {
  const { rating, setRating } = props;

  return (
    <TextField
      label="Rating"
      fullWidth
      value={rating}
      onChange={(event => setRating(event.target.value))}
    />
  );
};

export default HealthCheck;