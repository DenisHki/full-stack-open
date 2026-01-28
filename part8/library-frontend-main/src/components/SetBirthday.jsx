import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SET_BIRTHYEAR, ALL_AUTHORS } from "../queries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

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
    <Container maxWidth="md">
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <Box mb={2}>
          <TextField label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField label="Birth Year" size="small" type="number" value={born} onChange={(e) => setBorn(e.target.value)}
          />
        </Box>

        <Button variant="contained" type="submit" size="small">
          Update Author
        </Button>
      </form>
    </Container>
  );
};

export default SetBirthday;
