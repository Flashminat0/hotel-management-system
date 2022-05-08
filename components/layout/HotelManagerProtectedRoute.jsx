import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

const HotelManagerProtectedRoute = ({children}) => {
    const router = useRouter();

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [role, setRole] = useState([]);

    useEffect(async () => {
        const user = localStorage.getItem('HotelUser');

        if (!user) {
            await router.push('/login');
        }
        else {
            setUserLoggedIn(true);
            setRole(JSON.parse(localStorage.getItem('HotelUser')).role)
        }

        if (userLoggedIn && !role.includes("hotel-owner")){
            await router.push('/login');
        }

    }, []);

    return (
        <div>
            {userLoggedIn && role.includes("hotel-owner") && children}
        </div>
    );
};

export default HotelManagerProtectedRoute;
