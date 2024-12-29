interface TotalProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
