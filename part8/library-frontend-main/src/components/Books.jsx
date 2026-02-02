import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

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

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  const { data: allBooksData } = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data?.allBooks || [];
  const allBooks = allBooksData?.allBooks || [];

  const allGenres = [...new Set(allBooks.flatMap((book) => book.genres))];

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
            <TableCell sx={{ fontWeight: "bold" }}>Genre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author.name}</TableCell>
              <TableCell>{b.genres.join(", ")}</TableCell>
              <TableCell>{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedGenre && (
        <Box mt={2}>
          <em>
            Showing {books.length} book(s) in genre "{selectedGenre}"
          </em>
        </Box>
      )}
    </Container>
  );
};

export default Books;
