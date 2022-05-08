import React, {useEffect, useState} from 'react';
import axios from "axios";
import HomeLayout from "../components/layout/HomeLayout";
import HotelManagerProtectedRoute from "../components/layout/HotelManagerProtectedRoute";

const HotelPanel = () => {
    const [roomData, setRoomData] = useState({});
    const [editState, setEditState] = useState(false);


    useEffect(() => {
        axios.get('/api/hotel/getHotel', {
            params: {
                hotelOwnerId: JSON.parse(localStorage.getItem('HotelUser'))._id
            }
        }).then(res => {
            setRoomData(res.data.hotel.rooms);
        })
    }, []);

    const changeData = (e) => {
        if (e.target.value === "") {
            setRoomData({...roomData, [e.target.name]: 0});
        }

        if (isNaN(parseInt(e.target.value))) {
            return;
        }

        setRoomData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }

    const saveData = async (e) => {
        e.preventDefault();
        await axios.put('/api/hotel/updateHotel', {
            roomData,
            hotelOwnerId: JSON.parse(localStorage.getItem('HotelUser'))._id
        }).then(res => {
            setRoomData(res.data.newHotel.rooms);
        }).then(async res => {
            await setEditState(false);
        }).catch(err => {
            console.log(err);
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
                                <form action="#" method="POST">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                {Object.keys(roomData).map((key, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`col-span-6 grid grid-cols-6    `}>
                                                            <div
                                                                className="col-span-6 sm:col-span-3">
                                                                {key[0].toUpperCase() + key.slice(1).split('R').join(' R')}s
                                                            </div>

                                                            <div
                                                                className="col-span-6 sm:col-span-3">
                                                                <input
                                                                    value={roomData[key]}
                                                                    disabled={!editState}
                                                                    onChange={changeData}
                                                                    placeholder={` ${roomData[key]}`}
                                                                    type="text"
                                                                    name={key}
                                                                    id="last-name"
                                                                    autoComplete="number"
                                                                    className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  ${editState ? '' : 'bg-gray-100'}`}
                                                                />
                                                            </div>
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
            </HotelManagerProtectedRoute>
        </HomeLayout>
    );
};

export default HotelPanel;
