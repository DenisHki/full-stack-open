import { useState } from "react";
import "./App.css";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allFeedbacks = good + neutral + bad;
  const average = ((good - bad) / allFeedbacks).toFixed(2);
  const positive = ((good * 100) / allFeedbacks).toFixed(2);

  if (allFeedbacks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allFeedbacks} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive}%`} />
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
        <Button onClick={() => handleClick("good")} text="Good" />
        <Button onClick={() => handleClick("neutral")} text="Neutral" />
        <Button onClick={() => handleClick("bad")} text="Bad" />
      </div>
      <h2>Statistics</h2>
      <Statistics {...feedback} />
    </>
  );
};

export default App;
