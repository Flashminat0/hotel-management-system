import React, {useEffect, useState} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import UserProtectRoute from "../components/layout/UserProtectRoute";
import {SpeakerphoneIcon, XIcon} from '@heroicons/react/outline'
import {useRouter} from "next/router";

const MyAccount = () => {
    const router = useRouter();

    const [role, setRole] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('HotelUser') !== null) {
            setRole(JSON.parse(localStorage.getItem('HotelUser')).role)
        }
    }, []);

    return (
        <HomeLayout>
            <UserProtectRoute>
                {!role.includes(`hotel-owner`) && <div className={`m-5`}>
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
                </div>}
                {!role.includes(`taxi-driver`) && <div className={`m-5`}>
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
                </div>}

            </UserProtectRoute>
        </HomeLayout>
    );
};

export default MyAccount;
