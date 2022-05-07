import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

const AdminProtectedRoute = () => {
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


    }, []);

    return (
        <div>
            {userLoggedIn && role.includes("admin") && children}
        </div>
    );
};

export default AdminProtectedRoute;
