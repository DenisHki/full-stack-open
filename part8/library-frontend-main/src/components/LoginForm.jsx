import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { LOGIN, ME } from "../queries";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const LoginForm = ({ setError, setToken, setFavoriteGenre  }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const client = useApolloClient();

  const [login] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      const token = data.login.value;

      setToken(token);
      localStorage.setItem("authors-book-user-token", token);

      const result = await client.query({
        query: ME,
        fetchPolicy: "network-only",
      });
      const favoriteGenre = result.data.me.favoriteGenre;

      setFavoriteGenre(favoriteGenre);
      localStorage.setItem("favorite-genre", favoriteGenre);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  console.log(username)
  
  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={submit}>
        <Box mb={2}>
          <TextField
            label="Username"
            size="small"
            variant="outlined"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            size="small"
            variant="outlined"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Button variant="contained" type="submit" size="small">
          login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
