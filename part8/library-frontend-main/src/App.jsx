import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const App = () => {
  const [page, setPage] = useState("authors");

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <Box mb={3}>
      <Box mb={3}>
        <Tabs
          value={page}
          onChange={(e, value) => setPage(value)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Authors" value="authors" />
          <Tab label="Books" value="books" />
          <Tab label="Add Book" value="add" />
        </Tabs>
      </Box>

      <Container maxWidth="md">
        <Authors
          show={page === "authors"}
          authors={authorsResult.data.allAuthors}
        />
      </Container>
      <Container maxWidth="md">
        <Books show={page === "books"} books={booksResult.data.allBooks} />
      </Container>
      <Container maxWidth="md">
        <NewBook show={page === "add"} />
      </Container>
    </Box>
  );
};

export default App;
