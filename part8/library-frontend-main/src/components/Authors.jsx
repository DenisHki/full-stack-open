import SetBirthday from "./SetBirthday";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

const Authors = ({ show, authors }) => {
  if (!show) return null;

  return (
    <Container maxWidth="md">
      <h2>Authors</h2>

      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Born</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Books</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={4}>
        <SetBirthday authors={authors}/>
      </Box>
    </Container>
  );
};

export default Authors;
