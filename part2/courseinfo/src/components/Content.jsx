/* eslint-disable react/prop-types */

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

export default Content;
