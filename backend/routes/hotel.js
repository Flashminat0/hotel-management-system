
import express from "express";

const router = express.Router();

//middlewares
// import {requireSignIn} from "../middlewares";

// controllers
import {createHotel, getAllHotels, getHotel, updateHotelRoomData , getSingleRoomData, bookRoom} from "../controllers/hotel";

router.get("/hotel/get-all-hotel", getAllHotels);
router.post("/hotel/create-hotel", createHotel);
router.get("/hotel/get-hotel", getHotel);
router.put("/hotel/update-hotel", updateHotelRoomData);
router.get("/hotel/get-room-data", getSingleRoomData);
router.post("/hotel/book-room", bookRoom);

module.exports = router;
