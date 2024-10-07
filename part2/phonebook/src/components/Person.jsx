import React from "react";
import Button from "../UI/Button";
import classes from '../UI/Button.module.css';

const Person = (props) => {
  const deleteHandler = () => {
    if (window.confirm(`Delete ${props.person.name}?`)) {
      props.deletePerson(props.person.id);
    }
  };

  return (
    <li>
      {props.person.name} {props.person.number}
      <Button type="button" onClick={deleteHandler} className={classes.delete}>
        Delete
      </Button>
    </li>
  );
};

export default Person;
