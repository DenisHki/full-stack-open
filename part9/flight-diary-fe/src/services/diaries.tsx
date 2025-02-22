import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diary, NewDiary } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiary) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, object);
  return data;
};

export default { getAll, create };
