import React, { useEffect, useState } from "react";
import { Diary } from "./types";
import diariesService from "./services/diaries";
import { TextField, InputLabel, Button } from "@mui/material";
import { AxiosError } from "axios";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const fetchedDiaries = await diariesService.getAll();
        setDiaries(fetchedDiaries);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDiary((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdDiary = await diariesService.create(newDiary);
      setDiaries((prevDiaries) => [...prevDiaries, createdDiary]);
      setNewDiary({
        date: "",
        visibility: "",
        weather: "",
        comment: "",
      });
      setError("");
    } catch (error: unknown) {
      console.error("Error creating diary:", error);

      if (error instanceof AxiosError && error.response) {
        setError(`Failed to create diary: ${error.response.data}`);
      } else {
        setError("Failed to create diary entry. Please try again later.");
      }
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          name="date"
          fullWidth
          value={newDiary.date}
          onChange={handleInputChange}
          required
        />
        <InputLabel style={{ margin: 5 }}>Visibility</InputLabel>
        <TextField
          name="visibility"
          fullWidth
          value={newDiary.visibility}
          onChange={handleInputChange}
          required
        />
        <InputLabel style={{ margin: 5 }}>Weather</InputLabel>
        <TextField
          name="weather"
          fullWidth
          value={newDiary.weather}
          onChange={handleInputChange}
          required
        />
        <InputLabel style={{ margin: 5 }}>Comment</InputLabel>
        <TextField
          name="comment"
          fullWidth
          value={newDiary.comment}
          onChange={handleInputChange}
        />
        <Button
          style={{
            float: "right",
            marginTop: 20,
          }}
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div
          key={diary.id}
          style={{
            padding: "1em",
          }}
        >
          <p>
            <strong>{diary.date}</strong>
          </p>
          <p>
            <strong>Visibility:</strong> {diary.visibility}
          </p>
          <p>
            <strong>Weather:</strong> {diary.weather}
          </p>
          <p>
            <strong>Comment:</strong> {diary.comment}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
