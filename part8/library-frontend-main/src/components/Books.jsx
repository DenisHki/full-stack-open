import { useState } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  const books = props.books;

  const allGenres = [...new Set(books.flatMap((book) => book.genres))];

  const booksToShow = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  return (
    <Container maxWidth="md">
      <h2>Books</h2>
      <Box mb={3}>
        <Box mb={1}>
          <strong>Filter by genre:</strong>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip
            label="All genres"
            onClick={() => setSelectedGenre(null)}
            color={selectedGenre === null ? "primary" : "default"}
            variant={selectedGenre === null ? "filled" : "outlined"}
          />
          {allGenres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              onClick={() => setSelectedGenre(genre)}
              color={selectedGenre === genre ? "primary" : "default"}
              variant={selectedGenre === genre ? "filled" : "outlined"}
            />
          ))}
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Book name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksToShow.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author.name}</TableCell>
              <TableCell>{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedGenre && (
        <Box mt={2}>
          <em>
            Showing {booksToShow.length} book(s) in genre "{selectedGenre}"
          </em>
        </Box>
      )}
    </Container>
  );
};

export default Books;
