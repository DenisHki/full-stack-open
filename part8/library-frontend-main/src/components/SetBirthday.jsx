import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SET_BIRTHYEAR, ALL_AUTHORS } from "../queries";

const SetBirthday = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthyear] = useMutation(SET_BIRTHYEAR);

  const submit = async (event) => {
    event.preventDefault();

    setBirthyear({
      variables: { name, setBornTo: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthday;
