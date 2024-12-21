import express from "express";
import diagnoseEntries from "../../data/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnoseEntries);
});

export default router;
