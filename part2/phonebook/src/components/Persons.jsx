import Person from "./Person";

const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.length === 0 ? (
        <p>No names to show</p>
      ) : (
        props.filteredPersons.map((person) => (
          <Person key={person.id} person={person} />
        ))
      )}
    </ul>
  );
};

export default Persons;
