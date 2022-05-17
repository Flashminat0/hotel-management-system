import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from "axios";
import {useRouter} from "next/router";

export default class PayPalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {

            console.log("The payment was succeeded!", payment);


        }

        const onCancel = (data) => {


            axios.post('/api/hotel/book-room', {
                userId: JSON.parse(localStorage.getItem('HotelUser'))._id,
                hotelOwnerId: this.props.hotelOwnerId,
                roomId: this.props.roomId,
            }).then(res => {
            //    user bought the room
            }).catch(err => console.log(err));


        }

        const onError = (err) => {

            console.log("Error!", err);
            console.log(this.props.price);

        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.props.price;


        const client = {
            // sandbox: 'PAYPAl_SANDBOX_CLIENT_ID',
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
    }
}

