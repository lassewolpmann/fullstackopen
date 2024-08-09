import React, { BaseSyntheticEvent } from "react";
import { Visibility } from "../types.ts";

interface VisibilityButtonProps {
  visibility: Visibility
  setVisibility: React.Dispatch<React.SetStateAction<Visibility>>
  value: string
}

const VisibilityButton = (props: VisibilityButtonProps) => {
  const { visibility, setVisibility, value } = props;

  const handleChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value;

    if (value === "great") {
      setVisibility(Visibility.Great)
    } else if (value === "good") {
      setVisibility(Visibility.Good)
    } else if (value === "ok") {
      setVisibility(Visibility.Ok)
    } else if (value === "poor") {
      setVisibility(Visibility.Poor)
    } else {
      console.error("Invalid option")
    }
  }

  return (
    <div>
      <input type="radio" name="visibility" value={value} onChange={handleChange} checked={visibility === value} />
      <label htmlFor={"visibility"}>{value}</label>
    </div>
  )
}

export default VisibilityButton