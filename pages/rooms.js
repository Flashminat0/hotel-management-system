import React, {useEffect, useState} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import axios from "axios";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Rooms = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(async () => {
        await axios.get('/api//hotel/get-all-hotel')
            .then(res => {
                setHotels(res.data.hotels);
            })
    }, []);

    return (
        <HomeLayout>
            <div>
                <ul role="list" className="">
                    {hotels.map((singleHotel, index) => {
                        return (
                            <>
                                <div key={index}
                                     className={`mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:mx-32 `}>
                                    <div className={`row-span-2`}>
                                        <img src={singleHotel.image.url} alt=""
                                             className={`h-full w-full object-cover rounded-lg shadow-lg`}/>

                                    </div>
                                    <div className={`col-span-3`}>
                                        <p className={`text-4xl font-semibold`}>{singleHotel.name}</p>
                                        <p className={`text-2xl`}>{singleHotel.address}</p>
                                    </div>
                                    {Object.keys(singleHotel.rooms).map((singleRoom) => {
                                        return (
                                            <li key={singleRoom} className="col-span-1 flex shadow-lg rounded-md">
                                                <div
                                                    className={classNames(
                                                        'bg-blue-500 grid grid-rows-2 grid-cols-1 place-items-center',
                                                        `flex-shrink-0 flex items-center justify-center w-32 text-white text-lg font-medium rounded-l-md ${singleHotel.rooms[singleRoom] === 0 && 'bg-gray-300'}`
                                                    )}
                                                >
                                                <span className={`text-4xl`}>
                                                    {singleHotel.rooms[singleRoom]}
                                                </span>

                                                    {singleRoom.split('R')[0].toString().toUpperCase()}
                                                </div>
                                                {singleHotel.rooms[singleRoom] === 0 ? <>
                                                        <div
                                                            className="grid place-items-center w-screen border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                                            <div className="flex-shrink-0 pr-2">
                                                                <button
                                                                    disabled={true}
                                                                    type="button"
                                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                                >
                                                                    Unavailable
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <div
                                                        className="grid place-items-center w-screen border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                                        <div className="flex-shrink-0 pr-2">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                Book this room
                                                            </button>
                                                        </div>
                                                    </div>}
                                            </li>
                                        )
                                    })}
                                </div>
                                <hr className={`m-5`}/>
                            </>)
                    })}
                </ul>
            </div>
        </HomeLayout>
    );
};

export default Rooms;
