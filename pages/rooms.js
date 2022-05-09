import React, {useEffect, useState} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import axios from "axios";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Rooms = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);


    useEffect(async () => {
        await axios.get('/api//hotel/get-all-hotel')
            .then(res => {
                setHotels(res.data.hotels);
            })
    }, []);

    useEffect(() => {
        setFilteredHotels([])
        hotels.map(singleHotel => {

            // Select only unique room types
            const uniqueRoomTypes = [...new Set(singleHotel.rooms.map(room => room.roomType))];
            //["small","medium","large"],


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
            <div>
                <ul role="list" className="">
                    {filteredHotels.map((singleHotel, index) => {
                        return (
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
                                {singleHotel.rooms.map((singleRoom, index) => {
                                    return (
                                        <div>{JSON.stringify(singleRoom.roomType)}</div>
                                    )

                                })}
                            </div>
                        )
                    })}
                </ul>
            </div>
        </HomeLayout>
    );
};

export default Rooms;
