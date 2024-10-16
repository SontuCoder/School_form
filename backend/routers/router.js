import express from "express";
const router = express.Router();

import {login,signup,student_data} from "../controllers/studentControler.js";


router.route("/login").get(login);
router.route("/signup").post(signup);
router.route("/student_detail").get(student_data);

export default router;