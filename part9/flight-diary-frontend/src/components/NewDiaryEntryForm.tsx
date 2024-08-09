import React, { SyntheticEvent, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types.ts";
import { createEntry } from "../diaryService.ts";
import axios from "axios";
import VisibilityButton from "./VisibilityButton.tsx";
import WeatherButton from "./WeatherButton.tsx";

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
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
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

    setDate('')
    setVisibility(Visibility.Great)
    setWeather(Weather.Sunny)
    setComment('')
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={errorStyle}>{error}</p>
      <form onSubmit={entryCreation}>
        <div style={{ padding: 5 }}>
          <label htmlFor={"date"}><b>date</b></label><br />
          <input type="date" name="date" required={true} onChange={(event) => setDate(event.target.value)}
                 value={date} />
        </div>

        <div style={{ padding: 5 }}>
          <b>visibility</b>

          {Object.values(Visibility).map(value => (
            <VisibilityButton visibility={visibility} setVisibility={setVisibility} value={value} key={value} />
          ))}
        </div>

        <div style={{ padding: 5 }}>
          <b>weather</b>
          {Object.values(Weather).map(value => (
            <WeatherButton weather={weather} setWeather={setWeather} value={value} key={value} />
          ))}
        </div>

        <div style={{ padding: 5 }}>
          <label htmlFor={"comment"}><b>comment</b></label><br />
          <input type="text" name="comment" onChange={(event) => setComment(event.target.value)}
                 value={comment} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiaryEntryForm;