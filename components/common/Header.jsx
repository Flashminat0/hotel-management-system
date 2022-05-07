import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {firebaseApp} from "../../firebase";
import Link from "next/link";


const navigation = [
    {name: 'Rooms', href: '/rooms'},
    {name: 'Pricing', href: ''},
    {name: 'Taxi Service', href: '/'},
    {name: 'Account', href: '/my-account'},
]

const Header = () => {
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setLoggedIn(true)

                // ...
            } else {
                setLoggedIn(false)
                // User is signed out
                // ...
                setRole([]);
            }
        });

        if (!auth.currentUser) {
            setLoggedIn(false)
            setRole([]);
        }

    }, [auth.currentUser]);


    useEffect(() => {
        if (loggedIn) {
            if  (localStorage.getItem('HotelUser') !== null) {
                setRole(JSON.parse(localStorage.getItem('HotelUser')).role)
            }
        }
    }, [loggedIn]);

    function setSingedOutState() {
        setLoggedIn(false);
    }

    return (
        <header className="bg-indigo-600">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div
                    className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Link href={'/'}>
                            <a>
                                <span className="sr-only">Hotel Company</span>
                                <img
                                    className="h-10 w-auto"
                                    src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-hotel-hotel-management-flaticons-flat-flat-icons.png"
                                    alt=""
                                />
                            </a>
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            <Link href={'/rooms'}>
                                <a
                                    className="text-base font-medium text-white hover:text-indigo-50">
                                    Rooms
                                </a>
                            </Link>
                            <Link href={'/pricing'}>
                                <a
                                    className="text-base font-medium text-white hover:text-indigo-50">
                                    Pricing
                                </a>
                            </Link>
                            <Link href={'/taxi'}>
                                <a
                                    className="text-base font-medium text-white hover:text-indigo-50">
                                    Taxi Service
                                </a>
                            </Link>
                            {loggedIn && <Link href={'/my-account'}>
                                <a
                                    className="text-base font-medium text-white hover:text-indigo-50">
                                    Account
                                </a>
                            </Link>}
                            {loggedIn &&
                                <>
                                    {role.includes("admin")
                                        &&
                                        <Link href={'/admin-panel'}>
                                            <a
                                                className="text-base font-medium text-white hover:text-indigo-50">
                                                Admin Panel
                                            </a>
                                        </Link>
                                    }
                                </>


                            }
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        {loggedIn ? <>
                            <a
                                onClick={async () => await router.push('/login')}
                                className="cursor-pointer inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Logout
                            </a>
                        </> : <>
                            <a
                                onClick={async () => await router.push('/login')}
                                className="cursor-pointer inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Sign in
                            </a>
                            <a
                                onClick={async () => await router.push('/register')}
                                className="cursor-pointer  inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                            >
                                Sign up
                            </a>
                        </>}


                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <a key={link.name} href={link.href}
                           className="text-base font-medium text-white hover:text-indigo-50">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Header;
