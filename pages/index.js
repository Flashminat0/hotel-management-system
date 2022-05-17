import React, {useEffect} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import {useRouter} from "next/router";


const Index = () => {
    const router = useRouter();
    useEffect(async () => {
        await router.push('/rooms');
    }, []);

    return (
        <HomeLayout>
            <ul>
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
            </ul>

        </HomeLayout>
    );
};

export default Index;
