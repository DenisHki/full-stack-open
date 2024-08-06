import { useState } from "react";
import "./App.css";

function App() {
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

  const allFeedbacks = feedback.good + feedback.neutral + feedback.bad;
  let average = ((feedback.good - feedback.bad) / allFeedbacks).toFixed(2);

  if (allFeedbacks === 0) {
    average = 0;
  }

  let positive = ((feedback.good * 100) / allFeedbacks).toFixed(2);
  if (feedback.good === 0) {
    positive = 0;
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <div className="card">
        <button onClick={() => handleClick("good")}>Good</button>
        <button onClick={() => handleClick("neutral")}>Neutral</button>
        <button onClick={() => handleClick("bad")}>Bad</button>
      </div>
      <h2>Statistics</h2>
      <div>good: {feedback.good}</div>
      <div>neutral: {feedback.neutral}</div>
      <div>bad: {feedback.bad}</div>
      <div>all: {allFeedbacks}</div>
      <div>average: {average}</div>
      <div>positive: {positive}%</div>
    </>
  );
}

export default App;
