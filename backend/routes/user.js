import express from "express";

const router = express.Router();

//middlewares
// import {requireSignIn} from "../middlewares";

// controllers
import {becomeHotelManager, getUserDetails} from "../controllers/user";

router.put("/user/become-hotel-manager", becomeHotelManager);
router.get("/user/get-details", getUserDetails);


module.exports = router;
