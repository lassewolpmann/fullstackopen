import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types.ts";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(res => res.data)
}

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(res => res.data)
}