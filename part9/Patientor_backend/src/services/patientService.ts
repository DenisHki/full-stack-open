import patientEntries from "../../data/patients";
import { PatientEntry, NonSensitivePatient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

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

const getPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (
  entry: NewPatientEntry
): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
export default { getPatients, getNonSensitivePatients, getPatientById, addPatient };
