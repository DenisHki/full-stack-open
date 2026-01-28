import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(CREATE_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: Number(published), genres },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <Container maxWidth="sm">
      <h2>Create New Book</h2>
      <form onSubmit={submit}>
        <Box mb={2}>
          <TextField
            label="Title"
            size="small"
            variant="outlined"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Author"
            size="small"
            variant="outlined"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Published"
            size="small"
            variant="outlined"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </Box>
        <Box mb={2} display="flex" gap={1}>
          <TextField
            label="Genre"
            size="small"
            variant="outlined"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button
            onClick={addGenre}
            type="button"
            variant="contained"
            color="success"
            size="small"
          >
            add genre
          </Button>
        </Box>
        <Box mt={1} mb={2}>
          genres: {genres.join(" ")}
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="small"
          endIcon={<SendIcon />}
        >
          create book
        </Button>
      </form>
    </Container>
  );
};

export default NewBook;
