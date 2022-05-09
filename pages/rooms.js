import React, {useEffect, useState, Fragment} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import axios from "axios";
import {Dialog, Transition} from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Rooms = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [roomData, setRoomData] = useState([]);

    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(async () => {
        await axios.get('/api/hotel/get-all-hotel')
            .then(res => {
                setHotels(res.data.hotels);
            })
    }, []);

    useEffect(() => {
        setFilteredHotels([])
        hotels.map(singleHotel => {

            const uniqueRoomTypes = [...new Set(singleHotel.rooms.map(room => room.roomType))];

            if (singleHotel.rooms.length > 0) {

                const filteredRoomArray = []

                uniqueRoomTypes.map((roomType) => {
                    singleHotel.rooms.map(singleRoom => {
                        if (singleRoom.roomType === roomType) {
                            filteredRoomArray.push({
                                roomType: singleRoom.roomType,
                                data: singleRoom
                            });
                        }
                    })
                })
                const hotel = singleHotel
                hotel.rooms = filteredRoomArray;

                setFilteredHotels((prev) => {
                    return [...prev, hotel]
                });
            }
        })
    }, [hotels]);


    return (
        <HomeLayout>
            <>
                <div>
                    <ul role="list" className="">
                        {filteredHotels.map((singleHotel, index) => {
                            return (
                                <div key={index}
                                     className={`grid grid-cols-6 gap-4 p-5 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                    <div className={`row-span-2 col-span-2 p-4`}>
                                        <img src={singleHotel.image.url} alt=""
                                             className={`h-full w-full object-cover rounded-lg shadow-lg`}/>

                                    </div>
                                    <div className={`col-span-4 grid grid-rows-2 row-span-2`}>
                                        <div>
                                            <p className={`text-4xl font-semibold`}>{singleHotel.name}</p>
                                            <p className={`text-2xl`}>{singleHotel.address}</p>
                                        </div>
                                        <div className={`place-items-end grid place-content-evenly`}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    openModal()
                                                    setRoomData(singleHotel.rooms)
                                                }}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                                Browse rooms
                                            </button>
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
                                                                Select a room
                                                            </Dialog.Title>
                                                            <div className="mt-4 grid grid-cols-3 gap-2 ">
                                                                {roomData.map((singleRoom, index) => {
                                                                    return (
                                                                        <div
                                                                            onClick={() => {
                                                                                console.log(singleRoom.data)
                                                                            }}
                                                                            key={index}
                                                                            className={`flex items-center bg-blue-400 rounded-full ${singleRoom.data.isAvailable ? 'cursor-pointer' : ''}`}>
                                                                            <div
                                                                                className={`p-4 rounded-full h-10 w-10 ${singleRoom.data.isAvailable ? 'bg-green-400' : 'bg-red-500'}`}>

                                                                            </div>
                                                                            <p className={`pl-3`}>
                                                                                {singleRoom.roomType[0].toUpperCase() + singleRoom.roomType.slice(1)}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>

                                                            <div className="grid place-items-end mt-4">
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
                                </div>
                            )
                        })}
                    </ul>
                </div>


            </>
        </HomeLayout>
    );
};

export default Rooms;
