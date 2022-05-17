import React, {useEffect, useState} from 'react';
import HomeLayout from "../../components/layout/HomeLayout";
import {useRouter} from "next/router";
import axios from "axios";
import PayPalButton from "../../components/pyament/PayPalButton";


const SingleRoom = () => {
    const router = useRouter();

    const [roomData, setRoomData] = useState({});


    const {singleroom, hotelOwnerId} = router.query;
    useEffect(async () => {

        if (!hotelOwnerId) return;

        await axios.get(`/api/hotel/get-room-data`, {
            params: {
                roomId: singleroom,
                hotelOwnerId: hotelOwnerId
            }
        }).then((res) => {
                setRoomData({
                    ...res.data.room
                })
            }
        )
    }, [router.query]);

    return (
        <HomeLayout>
            {roomData && <>
                <div className={`px-40 pt-10`}>
                    <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Room Information</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Room type</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{roomData.roomType}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Room number</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{roomData.roomNumber}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Beds</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{roomData.beds}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">USD {roomData.price}.00</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Available</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{JSON.stringify(roomData.isAvailable)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className={`grid place-items-center pt-10`}>
                        {roomData &&
                            <PayPalButton price={roomData.price} hotelOwnerId={hotelOwnerId}
                                          roomId={singleroom}/>
                        }
                    </div>
                </div>
            </>}

        </HomeLayout>
    );
};

export default SingleRoom;
