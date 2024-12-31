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
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
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
