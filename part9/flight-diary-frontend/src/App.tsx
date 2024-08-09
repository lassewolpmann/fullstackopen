import { DiaryEntry } from "./types.ts";
import DiaryEntries from "./components/DiaryEntries.tsx";
import { useEffect, useState } from "react";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm.tsx";
import { getAllEntries } from "./diaryService.ts";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllEntries()
      .then(data => setEntries(data))
  }, [])

  return (
    <div>
      <NewDiaryEntryForm entries={entries} setEntries={setEntries} />
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App
