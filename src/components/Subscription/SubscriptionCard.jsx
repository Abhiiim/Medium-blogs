import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { userProfile } from '../../service/user_profile';
import { currentUser } from '../../service/current_user';

const MainDiv = styled.div`
    padding: 20px;
`;

const Card = styled.div`
    width: 200px;
    height: 200px;
    background-color: #ece2e2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
`;

const CardContent = styled.div`
    // width: 100%;
    text-align: center;
    font-size: 30px;
    flex: 1;
    display: flex;
    align-items: center;
`;

const CardButton = styled.button`
    width: 100%;
    background-color: blue;
    color: white;
    border: none;
    height: 40px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    cursor: pointer;
`

function SubscriptionCard({ count }) {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    async function fetchProfile(currUser) {
        setProfile(await userProfile(currUser));
    }

    async function fetchUser() {
        setUser(await currentUser());
    }
    useEffect(() => {
        fetchUser()
        fetchProfile(user);
        // setProfile(userProfile(user));
    }, [])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:3000/create_payment", {}, { withCredentials: true });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_f50cQ2GLkSElL3", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Test Payment",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:3000/confirm_payment", data);

                alert(result.data.msg);
            },
            prefill: {
                name: profile.name,
                email: user.email,
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <MainDiv>
            <Card>
                <CardContent>
                    {count} Post Per Day
                </CardContent>
                <CardButton onClick={displayRazorpay}>
                    Pay ${count}
                </CardButton>
            </Card>
        </MainDiv>
    )
}

export default SubscriptionCard