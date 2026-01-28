import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <Box mb={2}>
      <Alert severity="error" variant="filled">
        {errorMessage}
      </Alert>
    </Box>
  );
};

export default Notify;
