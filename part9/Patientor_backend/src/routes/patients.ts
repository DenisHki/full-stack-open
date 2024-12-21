import express, { Response } from "express";
//import patientEntries from "../../data/patients";
import patientService from "../services/patientService";
import { PatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;
