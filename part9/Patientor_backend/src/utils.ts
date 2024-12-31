import { NewSensitivePatientEntry, Gender } from "./types";
import { z } from "zod";

export const hospitalEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal("Hospital"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const occupationalHealthcareEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal("OccupationalHealthcare"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const healthCheckEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal("HealthCheck"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  healthCheckRating: z.number().int().min(0).max(3),
});

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(
    z.union([
      hospitalEntrySchema,
      occupationalHealthcareEntrySchema,
      healthCheckEntrySchema,
    ])
  ),
});

export const toNewPatientEntry = (
  object: unknown
): NewSensitivePatientEntry => {
  return newEntrySchema.parse(object) as NewSensitivePatientEntry;
};
