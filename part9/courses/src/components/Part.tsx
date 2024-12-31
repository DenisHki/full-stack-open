import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>{" "}
          <br />
          <i>{props.part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>{" "}
          <br />
          Group projects: {props.part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {props.part.name} {props.part.exerciseCount}{" "}
          </b>{" "}
          <br />
          <i>{props.part.description}</i> <br />
          Background material:{" "}
          <a href={props.part.backgroundMaterial}>
            {props.part.backgroundMaterial}
          </a>
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>{" "}
          <br />
          <i>{props.part.description}</i> <br />
          Requirements: {props.part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
