import React, {useEffect, useState} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import UserProtectRoute from "../components/layout/UserProtectRoute";
import {SpeakerphoneIcon, XIcon} from '@heroicons/react/outline'
import {useRouter} from "next/router";
import axios from "axios";
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'

const positions = [
    {
        id: 1,
        title: 'Back End Developer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
    },
    {
        id: 2,
        title: 'Front End Developer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
    },
    {
        id: 3,
        title: 'User Interface Designer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Design',
        closeDate: '2020-01-14',
        closeDateFull: 'January 14, 2020',
    },
];


const MyAccount = () => {
    const router = useRouter();

    const [role, setRole] = useState([]);
    const [userId, setUserId] = useState('');
    const [roomArray, setRoomArray] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('HotelUser') === null) {
            return
        }
        setRole(JSON.parse(localStorage.getItem('HotelUser')).role)
        setUserId(JSON.parse(localStorage.getItem('HotelUser'))._id)
    }, []);


    useEffect(() => {
        if (userId === '') {
            return
        }
        axios.get('/api/user/get-details', {
            params: {
                userId: userId
            }
        }).then(res => {
            setRoomArray(res.data.user.room)
        })
    }, [userId]);

    return (
        <HomeLayout>
            <UserProtectRoute>
                {!role.includes(`hotel-owner`) ? <div className={`m-5`}>
                        <div className="bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">I'm a hotel Owner</h3>
                                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                    <div className="max-w-xl text-sm text-gray-500">
                                        <p>
                                            We love to work with you to build the best hotel management system for you.
                                            Fill out the forms below to get started.
                                        </p>
                                    </div>
                                    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                        <button
                                            onClick={async () => {
                                                await router.push('/become-hotel-manager')
                                            }}
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="relative bg-indigo-600">
                        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                            <div className="pr-16 sm:text-center sm:px-16">
                                <p className="font-medium text-white">
                                    <span className="md:hidden">Congratulations! You can access Hotel Panel Page.</span>
                                    <span
                                        className="hidden md:inline">Congratulations! You can access Hotel Panel Page.</span>
                                    <span className="block sm:ml-2 sm:inline-block">
                                        <a
                                            onClick={async () => {
                                                await router.push('/hotel-panel')
                                            }}
                                            className="text-white font-bold underline cursor-pointer">
                                            {' '}
                                            Go there <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </span>
                                </p>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
                                <button
                                    type="button"
                                    className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </div>}
                {!role.includes(`taxi-driver`) ? <div className={`m-5`}>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">I'm a Taxi Driver</h3>
                            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                <div className="max-w-xl text-sm text-gray-500">
                                    <p>
                                        We love to work with you to build the best hotel management system for you.
                                        Fill out the forms below to get started.
                                    </p>
                                </div>
                                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="relative  bg-indigo-600">
                    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                        <div className="pr-16 sm:text-center sm:px-16">
                            <p className="font-medium text-white">
                                <span className="md:hidden">Congratulations! You can access Taxi Panel Page.</span>
                                <span
                                    className="hidden md:inline">Congratulations! You can access Taxi Panel Page.</span>
                                <span className="block sm:ml-2 sm:inline-block">
                                     <a
                                         onClick={async () => {
                                             await router.push('/taxi-panel')
                                         }}
                                         className="text-white font-bold underline cursor-pointer">
                                            {' '}
                                         Go there <span aria-hidden="true">&rarr;</span>
                                     </a>
                                </span>
                            </p>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
                            <button
                                type="button"
                                className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
                }

                <hr/>
                <h1 className={`text-2xl font-semibold p-3 pb-1`}>Booked Rooms</h1><br/>
                <div className="bg-white shadow overflow-hidden sm:rounded-md p-2">
                    <ul role="list" className="divide-y divide-gray-200">
                        {roomArray.map((singleRoom) => (
                            <li key={singleRoom.id}>
                                <a href="#" className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{singleRoom.roomType}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {singleRoom.roomNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {singleRoom.beds}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {singleRoom.hotelAddress.address}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    Booked on <time dateTime={singleRoom.time}>{singleRoom.time}</time>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </UserProtectRoute>
        </HomeLayout>
    );
};

export default MyAccount;
