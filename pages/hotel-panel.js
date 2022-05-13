import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import HomeLayout from "../components/layout/HomeLayout";
import HotelManagerProtectedRoute from "../components/layout/HotelManagerProtectedRoute";
import {RiHomeLine} from "react-icons/ri";
import {ImKey} from "react-icons/im";
import {FaBed} from "react-icons/fa";
import {BiMessageSquareAdd} from "react-icons/bi";
import {Dialog, Transition} from "@headlessui/react";

const HotelPanel = () => {
    const [roomData, setRoomData] = useState([]);
    const [editState, setEditState] = useState(false);

    const [filteredRoomData, setFilteredRoomData] = useState([]);
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setId(JSON.stringify(new Date().getTime()).slice(0, 10))
        setIsOpen(true)
    }

    useEffect(() => {
        fetchRoomData();
    }, []);


    const fetchRoomData = () => {
        axios.get('/api/hotel/get-hotel', {
            params: {
                hotelOwnerId: JSON.parse(localStorage.getItem('HotelUser'))._id
            }
        }).then(res => {
            setRoomData(res.data.hotel.rooms);
        })
    }

    useEffect(() => {
        const uniqueRoomTypes = [...new Set(roomData.map(room => room.roomType))];

        if (roomData.length > 0) {

            const filteredRoomArray = []

            uniqueRoomTypes.map((roomType) => {
                roomData.map(singleRoom => {
                    if (singleRoom.roomType === roomType) {
                        filteredRoomArray.push(singleRoom);
                    }
                })
            })

            setFilteredRoomData(filteredRoomArray);
        }

    }, [roomData]);


    const saveData = async (e, newRoomData) => {
        e.preventDefault();

        let dataToSend;
        if (newRoomData === undefined) {
            dataToSend = filteredRoomData
        } else {
            dataToSend = [...filteredRoomData, newRoomData]
        }


        await axios.put('/api/hotel/update-hotel', {
            roomData: dataToSend,
            hotelOwnerId: JSON.parse(localStorage.getItem('HotelUser'))._id
        }).then(res => {
            setRoomData(res.data.newHotel.rooms);
        }).then(async res => {
            await setEditState(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const removeARoom = (id) => {
        const newRoomData = filteredRoomData.filter(room => room.id !== id);
        setFilteredRoomData(newRoomData)
    }

    const [id, setId] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [beds, setBeds] = useState('');
    const [price, setPrice] = useState('');


    const addRoom = async (e) => {
        let newRoom = {
            id: id,
            roomType: roomType,
            roomNumber: roomNumber,
            beds: beds,
            price: price,
            isAvailable: true,
            time: ""
        }

        await saveData(e, newRoom).then(res => {
            fetchRoomData();
        }).then(res => {
            setRoomType('');
            setRoomNumber('');
            setBeds('');
            setPrice('');
        })
    }

    return (
        <HomeLayout>
            <HotelManagerProtectedRoute>
                <div className={`pt-5 px-3 lg:px-48`}>
                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal
                                        Information</h3>
                                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can
                                        receive mail.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                {!editState &&
                                    <div className={`grid grid-cols-1 my-2`}>
                                        <button
                                            onClick={openModal}
                                            type="button"
                                            className={`grid place-items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm focus:shadow-outline-indigo-500 transition duration-150 ease-in-out`}
                                        >
                                            <BiMessageSquareAdd className={`h-8 w-8`}/> Add Room
                                        </button>
                                        <hr className={`pt-2`}/>
                                    </div>
                                }
                                <form action="#" method="POST">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">

                                                {filteredRoomData.map((room, index) => {
                                                    return (
                                                        <div key={index} className={`col-span-6`}>
                                                            <div className="grid grid-rows-1 grid-cols-8 w-full">
                                                                <div className="grid place-items-center">
                                                                    <RiHomeLine className="h-8 w-8 text-gray-400"/>
                                                                </div>
                                                                <div className="ml-4 col-span-3">
                                                                    <h4 className="text-lg leading-6 font-medium text-gray-900">
                                                                        {room.roomType[0].toUpperCase() + room.roomType.slice(1)}
                                                                    </h4>
                                                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                                                        LKR {room.price}.00 &nbsp;|&nbsp; <ImKey
                                                                        className={`inline h-2`}/> {room.roomNumber} &nbsp;|&nbsp;
                                                                        <FaBed
                                                                            className={`inline`}/> &nbsp; {room.beds} Beds
                                                                    </p>
                                                                    <p>
                                                                        {room.isAvailable ? 'Available' : 'Occupied'}
                                                                    </p>
                                                                </div>
                                                                <div className={`col-start-8`}>
                                                                    {editState && <>
                                                                        {room.isAvailable &&
                                                                            <button
                                                                                onClick={() => removeARoom(room.id)}
                                                                                disabled={!room.isAvailable}
                                                                                type="button"
                                                                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${!room.isAvailable ? 'disabled bg-gray-300 hover:bg-gray-200' : ''}`}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        }</>}
                                                                </div>
                                                            </div>
                                                            <hr className={`mt-2`}/>
                                                        </div>
                                                    )
                                                })}


                                            </div>
                                            <hr className={`sm:hidden mt-2`}/>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            {editState ? <button
                                                onClick={saveData}
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Save Changes
                                            </button> : <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditState(true)
                                                }}
                                                type="button"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Edit Details
                                            </button>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div
                                className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-3xl font-medium leading-6 text-gray-900"
                                        >
                                            Add a room
                                        </Dialog.Title>
                                        <div className="mt-4 grid grid-cols-1 gap-2 ">
                                            <input
                                                id="new_room_id"
                                                disabled={true}
                                                name="new_room_id"
                                                type="text"
                                                autoComplete="new_room_id"
                                                required
                                                value={`ID : ${id}`}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            /> <input
                                            id="roomType"
                                            name="roomType"
                                            type="text"
                                            autoComplete="roomType"
                                            required
                                            value={roomType}
                                            placeholder={'Room Type'}
                                            onChange={
                                                (e) => setRoomType(e.target.value)
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        /> <input
                                            id="roomNumber"
                                            name="roomNumber"
                                            type="text"
                                            autoComplete="roomNumber"
                                            required
                                            value={roomNumber}
                                            placeholder={'Room Number'}
                                            onChange={
                                                (e) => setRoomNumber(e.target.value)
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        /> <input
                                            id="beds"
                                            name="beds"
                                            type="number"
                                            autoComplete="beds"
                                            required
                                            value={beds}
                                            placeholder={'Beds'}
                                            onChange={
                                                (e) => setBeds(parseInt(e.target.value))
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        /> <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            autoComplete="price"
                                            required
                                            value={price}
                                            placeholder={'Price'}
                                            onChange={
                                                (e) => setPrice(parseInt(e.target.value))
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        </div>

                                        <div className="flex justify-between mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                onClick={(e) => {
                                                    closeModal();
                                                    addRoom(e);
                                                }}
                                            >
                                                Add Room
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            </HotelManagerProtectedRoute>
        </HomeLayout>
    );
};

export default HotelPanel;
