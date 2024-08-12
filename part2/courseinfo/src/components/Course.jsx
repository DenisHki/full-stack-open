/* eslint-disable react/prop-types */
import Header from "./Header";
import Content from "./Content";

const Course = (props) => {
  console.log(props);
  const { course } = props;
  console.log("Printed in Course", props);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
