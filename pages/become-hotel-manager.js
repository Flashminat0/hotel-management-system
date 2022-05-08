import React, {useEffect, useState} from 'react';
import HomeLayout from "../components/layout/HomeLayout";
import {useRouter} from "next/router";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {firebaseApp} from "../firebase";
import axios from "axios";

const BecomeHotelManager = () => {
    const router = useRouter();
    const auth = getAuth(firebaseApp);


    const [role, setRole] = useState([]);
    const [showImage, setShowImage] = useState(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState({
        name: '',
        url: ''
    });


    useEffect(async () => {
        if (localStorage.getItem('HotelUser') !== null) {
            setRole(JSON.parse(localStorage.getItem('HotelUser')).role)
        }

        if (JSON.parse(localStorage.getItem('HotelUser')).role.includes('hotel-owner')) {
            await router.push('/my-account');
        }
    }, []);


    const uploadFile = (e) => {
        const file = e.target.files[0];
        const storageRef = getStorage(firebaseApp);

        const fileName = `${Date.now()}-${file.name}`;

        const fileRef = ref(storageRef, `images/${fileName}`);

        uploadBytes(fileRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImage({
                    name: fileName,
                    url: url
                });
            });
        }).then(() => {
            setShowImage(true);
        })
    }

    const deleteFileFromRef = () => {
        const storageRef = getStorage(firebaseApp);
        const fileRef = ref(storageRef, `images/${image.name}`);

        deleteObject(fileRef).then(() => {
            setImage({
                name: '',
                url: ''
            });
        }).then((x) => {
            setShowImage(false);
        })
    }

    const submitFormHandler = async (e) => {
        e.preventDefault();

        let user = undefined;

        if (name === '' || address === '' || image.url === '' || image.name === '') {
            alert('Please fill all the fields');
        }

        await axios.put('/api/user/become-hotel-manager', {
            email: auth.currentUser.email
        }).then((res) => {
            localStorage.setItem('HotelUser', JSON.stringify(res.data.user));
            user = res.data.user;
        }).then(async () => {
            await axios.post('/api/hotel/create-hotel', {
                owner: user._id,
                name: name,
                address: address,
                image: image
            }).then(async (res) => {
                // console.log(res);
                await router.push('/my-account');
            })
        }).catch(err => {
            console.log(err);
        });

    }


    return (
        <HomeLayout>
            {!role.includes(`hotel-owner`) && <div className="mx-auto p-20 lg:mx-0">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Let's work together</h2>
                <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                    We’d love to hear from you! Send us a message using the form opposite, or email us. We’d love to
                    hear
                    from you! Send us a message using the form opposite, or email us.
                </p>
                <form onSubmit={submitFormHandler} className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div className={`sm:col-span-2`}>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <div className="mt-1">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-grape-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className={`sm:col-span-2`}>
                        <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <div className="mt-1">
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required={true}
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="address-line"
                                className="block w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-grape-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                            Photo
                        </label>
                        <div className={`mt-1 flex items-center ${showImage && 'grid'}`}>
                            {showImage &&
                                <div className={`grid place-items-center`}>
                                    <img src={image.url} alt={image.name}/>
                                </div>}

                            {!showImage && <label
                                htmlFor="file-upload"
                                className=" bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    onChange={uploadFile}
                                    id="file-upload" name="file-upload" type="file" className="sr-only"/>
                            </label>
                            }

                        </div>
                    </div>

                    {showImage && <div className={`sm:col-span-2`}>
                        <button
                            onClick={deleteFileFromRef}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full justify-center"
                        >
                            Remove Photo
                        </button>
                    </div>}
                    <div className={`sm:col-span-2`}>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                        >
                            Submit
                        </button>
                    </div>

                </form>

            </div>
            }
        </HomeLayout>
    );
};

export default BecomeHotelManager;
