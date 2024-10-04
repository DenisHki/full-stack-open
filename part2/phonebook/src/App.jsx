import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    console.log("from name", e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
    console.log("from number", e.target.value);
  };

  const handleFilteredbyName = (e) => {
    setFiltered(e.target.value);
    console.log("from handleSearchbyName", e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { id: Date.now(), name: newName, number: newNumber };

    if (!newName || !newNumber) {
      alert("enter a valid name and number");
      return;
    }

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
