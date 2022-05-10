import React, {useEffect, useState} from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signOut
} from "firebase/auth";
import {useRouter} from "next/router";
import {firebaseApp} from "../firebase";
import HomeLayout from "../components/layout/HomeLayout";
import axios from "axios";

const Register = () => {
    const router = useRouter();
    const auth = getAuth(firebaseApp);


    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const createAccountHandlerWithEmailAndPassword = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/hotel-management-system-eef64.appspot.com/o/blank-profile-picture-973460__480.webp?alt=media&token=9a424f68-fd91-4e9f-9866-f417c7633630",
                })
                    .then(() => {
                        axios.post('/api/register', {
                            name: auth.currentUser.displayName,
                            email: auth.currentUser.email,
                        }).then(async (res) => {
                            localStorage.setItem('HotelUser', JSON.stringify(res.data));
                        }).then(async () => {
                            await router.push('/');
                        })
                    })
                    .catch((error) => {
                        // An error occurred
                        // ...
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const registerWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

            })
            .then(async () => {
                await axios.post('/api/register', {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                }).then((res) => {
                    localStorage.setItem('HotelUser', JSON.stringify(res.data));
                }).then(async () => {
                    await router.push('/');
                })
            })

            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    useEffect(() => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('HotelUser');
        }).catch((error) => {
            // An error happened.
        });
    }, []);


    return (
        <HomeLayout>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-24 w-auto"
                        src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-hotel-hotel-management-flaticons-flat-flat-icons.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up with us </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a
                            onClick={async () => {
                                await router.push('/login')
                            }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                            Login
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={createAccountHandlerWithEmailAndPassword}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Display Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => {
                                            setDisplayName(e.target.value)
                                        }}
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">

                                <div>
                                    <a
                                        onClick={registerWithGoogle}
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Sign in with Google</span>
                                        <img src="https://img.icons8.com/fluency/48/000000/google-logo.png"
                                             alt={"google"}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Register;
