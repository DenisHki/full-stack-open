import React, { useEffect } from "react";
import { Diary } from "./types";
import diariesService from "./services/diaries";

function App() {
  const [diaries, setDiaries] = React.useState<Diary[]>([]);

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

  return (
    <div>
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
        </div>
      ))}
    </div>
  );
}

export default App;
