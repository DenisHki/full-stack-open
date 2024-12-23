import express, { Response, Request, NextFunction } from "express";
import patientService from "../services/patientService";
import { PatientEntry } from "../types";
import { newEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post("/", newPatientParser, (req, res) => {
  const newPatientEntry = newEntrySchema.parse(req.body);
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
