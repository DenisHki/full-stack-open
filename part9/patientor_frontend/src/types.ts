export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type HospitalEntry = {
  id: string;
  date: string;
  type: "Hospital";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
};

export type OccupationalHealthcareEntry = {
  id: string;
  date: string;
  type: "OccupationalHealthcare";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type HealthCheckEntry = {
  id: string;
  date: string;
  type: "HealthCheck";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  healthCheckRating: number;
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
