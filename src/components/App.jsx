import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import Filter from "./Filter";
import axios from "axios";

const API_URL = "http://localhost:3000/posts";

async function getAPIData () {
    const response = await axios.get(API_URL);
    return response.data;
}

function App () {

    useEffect(() => {
        // getAPIData().then((items) => {
        //     console.log(items);
        // })

        axios.get('http://localhost:3000/api/posts') // Replace with your Rails API endpoint
            .then(response => {
                // Use the fetched data in your React app
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/posts"); 
    //             const data = await response.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData(); 
    // }, []);

    return (
        <div className="container">
            <Navbar />
            <Filter />
            <div className="lists">
                <Post />
            </div>
        </div>
    )
}

export default App;