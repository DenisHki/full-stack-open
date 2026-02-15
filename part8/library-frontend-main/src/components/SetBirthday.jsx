import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SET_BIRTHYEAR, ALL_AUTHORS } from "../queries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SetBirthday = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthyear] = useMutation(SET_BIRTHYEAR);

  const { authors, setError } = props;

  const submit = async (event) => {
    event.preventDefault();

    setBirthyear({
      variables: { name, setBornTo: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }],
      onError: (error) => setError(error.message),
    });
    setName("");
    setBorn("");
  };

  return (
    <Container maxWidth="md">
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <Box mb={2} sx={{ width: 222 }}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Author</InputLabel>
            <Select
              value={name}
              label="Author"
              onChange={(e) => setName(e.target.value)}
            >
              {authors.map((a) => (
                <MenuItem key={a.name} value={a.name}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <TextField
            label="Birth Year"
            size="small"
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
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
