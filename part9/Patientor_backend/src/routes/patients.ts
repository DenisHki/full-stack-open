/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { Response } from "express";
//import patientEntries from "../../data/patients";
import patientService from "../services/patientService";
import { PatientEntry } from "../types";

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

router.post("/", (req, res) => {
  const entry = req.body;
  const addedPatient = patientService.addPatient(
    entry
  );
  res.json(addedPatient);
});

export default router;
