import express from "express";
import { signin, signup, saveDetails } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/saveDetails", saveDetails);

export default router;
