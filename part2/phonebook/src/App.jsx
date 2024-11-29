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
  const [notification, setNotification] = useState({ message: null, type: "" });

  // get all persons
  useEffect(() => {
    personService
      .getAll()
      .then((initialResult) => {
        console.log("Fetched persons:", initialResult);
        setPersons(initialResult);
      })
      .catch((error) => {
        console.log("Couldn't fetch data", error);
        setNotification({
          message: "Error fetching data from the server",
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: "" });
        }, 5000);
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

    if (newName.length < 3) {
      setNotification({
        message: "Name must be at least 3 characters long.",
        type: "error",
      });
      setTimeout(() => setNotification({ message: null, type: "" }), 5000);
      return;
    }

    const phoneVal = /^\d{2,3}-\d{7,}$/;
    if (!phoneVal.test(newNumber)) {
      setNotification({
        message:
          "The phone number should have the following format: 09-1234556 or 040-22334455",
        type: "error",
      });
      setTimeout(() => setNotification({ message: null, type: "" }), 5000);
      return;
    }

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
            setNotification({
              message: `The number of ${newName} is updated`,
              type: "success",
            });
            setTimeout(() => {
              setNotification({ message: null, type: "" });
            }, 5000);
          })
          .catch((error) => {
            console.log("Something went wrong", error);
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setNotification({ message: null, type: "" });
            }, 5000);
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
        setNotification({ message: `Added ${newName}`, type: "success" });
        setTimeout(() => {
          setNotification({ message: null, type: "" });
        }, 5000);
      })
      .catch((error) => {
        console.log("Creation error:", error);
      });
  };

  // delete person
  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    personService
      .deletePersonById(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          message: `Successfully deleted ${personToDelete.name}`,
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: null, type: "" });
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setNotification({
          message: `Information of ${personToDelete.name} has already been removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: "" });
        }, 5000);
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
