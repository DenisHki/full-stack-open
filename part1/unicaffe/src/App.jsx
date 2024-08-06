import { useState } from "react";
import "./App.css";


const Statistics = ({good, neutral, bad}) => {
  const allFeedbacks = good + neutral + bad;
  const average = allFeedbacks > 0 ? ((good - bad) / allFeedbacks).toFixed(2) : 0;
  const positive = allFeedbacks > 0 ? ((good * 100) / allFeedbacks).toFixed(2) : 0;

  return (
    <>
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {allFeedbacks}</div>
      <div>average: {average}</div>
      <div>positive: {positive}%</div>
    </>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <div className="card">
        <button onClick={() => handleClick("good")}>Good</button>
        <button onClick={() => handleClick("neutral")}>Neutral</button>
        <button onClick={() => handleClick("bad")}>Bad</button>
      </div>
      <h2>Statistics</h2>
      <Statistics {...feedback} />
    </>
  );
}

export default App;
