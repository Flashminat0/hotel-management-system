import User from "../models/user";

const ObjectId = require('mongoose').Types.ObjectId;
import Hotel from "../models/hotel";

export const createHotel = async (req, res) => {
    const {name, address, image, owner} = req.body;

    const newHotel = new Hotel({name, address, image, owner});

    await Hotel.create(newHotel);

    return res.status(201).json({
        newHotel
    })
}

export const getHotel = async (req, res) => {
    const {hotelOwnerId} = req.query;

    const hotel = await Hotel.findOne({owner: hotelOwnerId});

    return res.status(200).json({
        hotel
    })

}


export const updateHotelRoomData = async (req, res) => {
    const {hotelOwnerId, roomData} = req.body;

    const newHotel = await Hotel.findOneAndUpdate({owner: hotelOwnerId}, {$set: {rooms: roomData}}, {new: true})

    return res.status(200).json({
        newHotel
    })
}

export const getAllHotels = async (req, res) => {

    const hotels = await Hotel.find();

    return res.status(200).json({
        hotels
    })

}

export const getSingleRoomData = async (req, res) => {
    const {hotelOwnerId, roomId} = req.query;

    const hotel = await Hotel.findOne({owner: hotelOwnerId});


    const room = hotel.rooms.find(room => room.id.toString() === roomId);

    room.address = hotel.address;
    return res.status(200).json({
        room
    })

}

export const bookRoom = async (req, res) => {
    const {userId, hotelOwnerId, roomId} = req.body;

    let hotel = await Hotel.findOne({owner: hotelOwnerId});

    const room = hotel.rooms.find(room => room.id.toString() === roomId);

    room.isAvailable = false;
    let time = new Date()
    room.time = time.toString();
    room.userId = userId;


    let newRoomList = hotel.rooms.map(existingRoom => {
        if (existingRoom.id.toString() !== roomId.toString()) {
            return existingRoom
        } else {
            return room
        }
    })

    hotel.rooms = newRoomList


    await Hotel.findOneAndUpdate({owner: hotelOwnerId}, hotel, {new: true})

    const customer = await User.findOne({_id: userId})

    customer.room.push({
        ...room,
        hotelAddress: hotel.address,
    })

    await User.findOneAndUpdate({_id: userId}, customer, {new: true})

    return res.status(200).json({
        message: "Room booked successfully"
    })
}
