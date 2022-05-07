import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

const UserProtectRoute = ({children}) => {
    const router = useRouter();

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(async () => {
        const user = localStorage.getItem('HotelUser');

        if (!user) {
            await router.push('/login');
        }
        else {
            setUserLoggedIn(true);
        }

    }, []);

    return (
        <div>
            {userLoggedIn && children}
        </div>
    );
};

export default UserProtectRoute;
