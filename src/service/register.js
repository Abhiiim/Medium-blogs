import axios from "axios";

const url = "http://localhost:3000/signup"

export const register = (data) => {
    axios.post(url, {
        user: data
    }, {
        withCredentials: true,
        headers:{
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}