import React, { SyntheticEvent, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types.ts";
import { createEntry } from "../diaryService.ts";
import axios from "axios";

interface NewDiaryEntryFormProps {
  entries: DiaryEntry[],
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const errorStyle = {
    color: 'red'
  }

  const { entries, setEntries } = props;

  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Rainy);
  const [comment, setComment] = useState<string>('');

  const [error, setError] = useState<string | null>(null)

  const entryCreation = (event: SyntheticEvent) => {
    event.preventDefault()
    const newEntry: DiaryEntry = {
      id: entries.length + 1,
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }

    createEntry(newEntry)
      .then(data => {
        setEntries(entries.concat(data))
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data)

            setTimeout(() => setError(null), 5000)
          }
        } else {
          console.error(error);
        }
      })
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={errorStyle}>{error}</p>
      <form onSubmit={entryCreation}>
        <label htmlFor={"date"}>date</label>
        <input type="text" name="date" onChange={(event) => setDate(event.target.value)} value={date} /><br />

        <label htmlFor={"visibility"}>visibility</label>
        <input type="text" name="visibility" onChange={(event) => setVisibility(event.target.value as Visibility)} value={visibility} /><br />

        <label htmlFor={"weather"}>weather</label>
        <input type="text" name="weather" onChange={(event) => setWeather(event.target.value as Weather)} value={weather} /><br />

        <label htmlFor={"comment"}>comment</label>
        <input type="text" name="comment" onChange={(event) => setComment(event.target.value)} value={comment} /><br />

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiaryEntryForm;