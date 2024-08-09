import React, { SyntheticEvent, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types.ts";
import { createEntry } from "../diaryService.ts";

interface NewDiaryEntryFormProps {
  entries: DiaryEntry[],
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const entryCreation = (event: SyntheticEvent) => {
    event.preventDefault()
    const newEntry: DiaryEntry = {
      id: props.entries.length + 1,
      date: "2020-01-01",
      weather: Weather.Cloudy,
      visibility: Visibility.Good,
      comment: "no comment"
    }

    createEntry(newEntry)
      .then(data => {
        props.setEntries(props.entries.concat(data))
      })
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={entryCreation}>
        <label htmlFor={"date"}>date</label>
        <input type="text" name="date" onChange={(event) => setDate(event.target.value)} value={date} /><br />

        <label htmlFor={"visibility"}>visibility</label>
        <input type="text" name="visibility" onChange={(event) => setVisibility(event.target.value)} value={visibility} /><br />

        <label htmlFor={"weather"}>weather</label>
        <input type="text" name="weather" onChange={(event) => setWeather(event.target.value)} value={weather} /><br />

        <label htmlFor={"comment"}>comment</label>
        <input type="text" name="comment" onChange={(event) => setComment(event.target.value)} value={comment} /><br />

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiaryEntryForm;