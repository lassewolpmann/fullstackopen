import { DiaryEntry } from "../types.ts";

interface DiaryEntriesProps {
  entries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {props.entries.map(entry => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <div>
            visibility: {entry.visibility}<br />
            weather: {entry.weather}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DiaryEntries;