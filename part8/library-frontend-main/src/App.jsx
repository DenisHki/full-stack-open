import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/Recommended";
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(
        `New book added: "${addedBook.title}" by ${addedBook.author.name}`,
      );
    },
  });

  const [token, setToken] = useState(
    localStorage.getItem("authors-book-user-token"),
  );

  const [favoriteGenre, setFavoriteGenre] = useState(
    localStorage.getItem("favorite-genre"),
  );

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Notify errorMessage={errorMessage} />
            <Typography variant="h5" mb={2}>
              Login
            </Typography>
            <LoginForm
              setToken={setToken}
              setError={notify}
              setFavoriteGenre={setFavoriteGenre}
            />
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Notify errorMessage={errorMessage} />
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Library App</Typography>
            <Button color="error" variant="outlined" onClick={onLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Paper elevation={2} sx={{ mb: 3, mt: 2 }}>
          <Tabs
            value={page}
            onChange={(e, value) => setPage(value)}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab label="Authors" value="authors" />
            <Tab label="Books" value="books" />
            <Tab label="Add Book" value="add" />
            <Tab label="Recommended" value="recommended" />
          </Tabs>
        </Paper>
        {page === "authors" && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Authors
              show={true}
              authors={authorsResult.data.allAuthors}
              setError={notify}
            />
          </Paper>
        )}
        {page === "books" && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Books show={true} />
          </Paper>
        )}
        {page === "add" && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <NewBook show={true} setError={notify} />
          </Paper>
        )}

        {page === "recommended" && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <RecommendedBooks
              books={booksResult.data.allBooks}
              favoriteGenre={favoriteGenre}
            />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default App;
