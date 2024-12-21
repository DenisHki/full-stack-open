import patientEntries from "../../data/patients";
import { PatientEntry, NonSensitivePatient } from "../types";

const patients: PatientEntry[] = patientEntries;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

export default { getPatients, getNonSensitivePatients };
