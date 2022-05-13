import React, {useEffect} from 'react';
import HomeLayout from "../../components/layout/HomeLayout";
import {useRouter} from "next/router";
import axios from "axios";

const SingleRoom = () => {
    const router = useRouter();
    const {singleroom} = router.query;

    useEffect(async () => {
        console.log(router.query);

        await axios.get(`/api/hotel/get-room-data`, {
            params: {
                roomId: singleroom
            }
        }).then((res) => {
                console.log(res);
            }
        )

    }, [router.query]);

    return (
        <HomeLayout>
            {/*{singleRoom.data.id}*/}
            {singleroom}
        </HomeLayout>
    );
};

export default SingleRoom;
