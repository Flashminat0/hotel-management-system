import React from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import UserProtectRoute from "../components/layout/UserProtectRoute";

const MyAccount = () => {
    return (
        <HomeLayout>
            <UserProtectRoute>


            </UserProtectRoute>
        </HomeLayout>
    );
};

export default MyAccount;
