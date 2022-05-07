import React from 'react';
import {useRouter} from "next/router";

const About = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                router.push('/');
            }}>
            <h1>About</h1>
        </div>
    );
};

export default About;
