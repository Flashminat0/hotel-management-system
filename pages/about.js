import React from 'react';
import {useRouter} from "next/router";
import HomeLayout from "../components/layout/HomeLayout";

const About = () => {
    const router = useRouter();

    return (
        <HomeLayout
            onClick={() => {
                router.push('/');
            }}>
            <h1>About</h1>
        </HomeLayout>
    );
};

export default About;
