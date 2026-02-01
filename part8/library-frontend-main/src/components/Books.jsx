import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const books = props.books;

  return (
    <Container maxWidth="md">
      <h2>Books</h2>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Book name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Genres</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Published</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {books.map((b) => (
              <TableRow key={b.id} >
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author.name}</TableCell>
                 <TableCell>{b.genres.join(", ")}</TableCell>
                <TableCell>{b.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </Container>
  );
};

export default Books;
