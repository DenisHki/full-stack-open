interface CoursePartsProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = (props: CoursePartsProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
