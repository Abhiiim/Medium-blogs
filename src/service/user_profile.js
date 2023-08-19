import { useState } from "react";
import { currentUser } from "./current_user";
import axios from 'axios';

export async function userProfile (userId) {
    // console.log(user);
    let url = "http://localhost:3000/profiles/"
    url = `${url}${userId}`
    // console.log(userId);
    try {
        const res = await axios.get(url, {
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}