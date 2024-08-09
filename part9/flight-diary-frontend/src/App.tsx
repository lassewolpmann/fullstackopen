import { DiaryEntry } from "./types.ts";
import DiaryEntries from "./components/DiaryEntries.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(res => {
        setEntries(res.data)
      })
  }, [])

  return (
    <div>
      <h1>Add new entry</h1>
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App
