import React from "react";
import { Entry } from "../../types";
import { Box, Typography } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";

interface EntryDetailsProps {
  entry: Entry; // Entry type from Patient
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">Health Check</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Health Rating: {entry.healthCheckRating}</Typography>
          <HealthAndSafetyIcon color="secondary" />
        </Box>
      );

    case "Hospital":
      return (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">Hospital Entry</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Discharge Date: {entry.discharge?.date}</Typography>
          <Typography>
            Discharge Criteria: {entry.discharge?.criteria}
          </Typography>
          <LocalHospitalIcon color="primary" />
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">Occupational Healthcare Entry</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          <Typography>
            Sick Leave: {entry.sickLeave?.startDate} -{" "}
            {entry.sickLeave?.endDate}
          </Typography>
          <WorkIcon color="primary" />
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">Unknown Entry Type</Typography>
        </Box>
      );
  }
};

export default EntryDetails;
