import express from "express";

const router = express.Router();

//middlewares
// import {requireSignIn} from "../middlewares";

// controllers
import {login, register} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);

module.exports = router;
