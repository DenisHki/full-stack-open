import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [changeMessage, setChangeMessage] = useState("");

  // get all persons
  useEffect(() => {
    personService
      .getAll()
      .then((initialResult) => {
        setPersons(initialResult);
      })
      .catch((error) => {
        setChangeMessage("Couldn't fetch persons.");
        console.error("Fetch error:", error);
      });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    //console.log("from name", e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
    //console.log("from number", e.target.value);
  };

  const handleFilteredbyName = (e) => {
    setFiltered(e.target.value);
    //console.log("from handleSearchbyName", e.target.value);
  };

  // create or update a person
  const addPerson = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) {
      alert("enter a valid name and number");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
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
            setChangeMessage(`Successfully updated ${newName}'s number.`);
          })
          .catch((error) => {
            setChangeMessage("Failed to update person.");
            console.error("Update error:", error);
          });
      }
      return;
    }

    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };

    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
        setChangeMessage(`Successfully added ${newName}.`);
      })
      .catch((error) => {
        setChangeMessage("Failed to add person.");
        console.error("Creation error:", error);
      });
  };

  // delete person
  const deletePerson = (id) => {
    personService
      .deletePersonById(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        alert(`Successfully deleted ${id}.`);
      })
      .catch((error) => {
        setChangeMessage("Failed to delete person.");
        console.log(error);
      });
  };
  
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
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
