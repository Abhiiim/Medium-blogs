// import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const url = 'http://localhost:3000/articles';
let create_url = 'http://localhost:3000/create';

let posts = [];

export const getPost = () => {
    axios.get(url, {
        withCredentials: true
    })
        .then(response => {
            posts = response.data;
            return posts;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    console.log(posts);
}

export default posts;

export const postPost = (data) => {
    // console.log(data);
    axios.post(create_url, {
        title: data.title,
        topic: data.topic,
        description: data.content,
        author: "Abhishek",
        user_id: 1
    }, {
        withCredentials: true,
        headers:{
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}