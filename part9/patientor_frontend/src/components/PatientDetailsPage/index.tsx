import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Gender } from "../../types";
import { apiBaseUrl } from "../../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Typography } from "@mui/material";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
      } catch (err) {
        setError("Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!patient) return <div>No patient found.</div>;

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h4"
          style={{ marginRight: "8px", marginTop: "20px", fontWeight: "bold" }}
        >
          {patient.name}
        </Typography>
        {patient.gender === Gender.Female ? (
          <FemaleIcon color="secondary" />
        ) : (
          <MaleIcon color="primary" />
        )}
      </Box>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h2>entries</h2>
      {patient.entries.map((entry, index) => (
        <div key={index}>
          <p>
            {entry.date} {entry.description}
          </p>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <div>
              <ul>
                {entry.diagnosisCodes.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
