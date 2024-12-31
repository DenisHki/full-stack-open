import { z } from "zod";
import { newEntrySchema } from "./utils";

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: (HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry)[];
}

export interface Entry {
  id: string;
  date: string;
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating?: number; 
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  healthCheckRating: number;
}

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatient = Omit<PatientEntry, "ssn">;

export type NewSensitivePatientEntry = Omit<PatientEntry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
