import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // get all persons
  useEffect(() => {
    personService
      .getAll()
      .then((initialResult) => {
        setPersons(initialResult);
      })
      .catch((error) => {
        console.log("Couldn't fetch data", error);
      });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilteredbyName = (e) => {
    setFiltered(e.target.value);
  };

  // create or update a person
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const updatedPerson = { ...existingPerson, number: newNumber };

    if (!newName || !newNumber) {
      alert("enter a valid name and number");
      return;
    }

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updateNumber(existingPerson.id, updatedPerson)
          .then((changedPerson) => {
            //console.log(response.data)
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : changedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage(`The number of ${newName} is updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log("Something went wrong", error);
          });
      }
      return;
    }

    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Creation error:", error);
      });
  };

  // delete person
  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    personService
      .deletePersonById(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage(`Successfully deleted ${personToDelete.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filtered={filtered} onSearchChange={handleFilteredbyName} />
      <h2>Add a new number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
