import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from "axios";
import {useRouter} from "next/router";

const PayPalButton = (props) => {
    const router = useRouter();


    const onSuccess = (payment) => {
        axios.post('/api/hotel/book-room', {
            userId: JSON.parse(localStorage.getItem('HotelUser'))._id,
            hotelOwnerId: props.hotelOwnerId,
            roomId: props.roomId,
        }).then(async (res) => {
            //    user bought the room
            await router.push('/my-account')
        }).catch(err => console.log(err));

    }

    const onCancel = (data) => {


        console.log("The payment was cancelled!");


    }

    const onError = (err) => {

        console.log("Error!", err);
        console.log(props.price);

    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = props.price;


    const client = {
        sandbox: 'PAYPAl_SANDBOX_CLIENT_ID',
        production: 'YOUR-PRODUCTION-APP-ID',  //fill with your app id
    }

    return (
        <PaypalExpressBtn
            style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
            }}
            env={env} client={client} currency={currency} total={total} onError={onError}
            onSuccess={onSuccess} onCancel={onCancel}/>
    );
};

export default PayPalButton;
