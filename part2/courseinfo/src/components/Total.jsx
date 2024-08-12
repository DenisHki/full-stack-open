/* eslint-disable react/prop-types */

const Total = (props) => {
  const { exercises } = props;
  const total = exercises.reduce(
    (acc, exercise) => acc + exercise.exercises,
    0
  );

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Total;
