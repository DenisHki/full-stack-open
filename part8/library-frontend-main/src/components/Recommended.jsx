import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const RecommendedBooks = ({ books, favoriteGenre }) => {
  const filtered = books.filter((b) => b.genres.includes(favoriteGenre));

  return (
    <Container maxWidth="md">
      <h2>Recommended books</h2>
      <p>
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Published</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author.name}</TableCell>
              <TableCell>{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default RecommendedBooks;
