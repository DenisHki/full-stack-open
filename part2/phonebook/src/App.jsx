import { useState } from "react";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

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
    const newPerson = { name: newName, number: newNumber };

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
      <Filter filtered={filtered} handleFilteredbyName={handleFilteredbyName} />
      <h2>Add a new number</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.length === 0 ? (
          <p>No names to show</p>
        ) : (
          filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;