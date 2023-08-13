import axios from "axios";

const url = "http://localhost:3000/signup"

export const register = (data) => {
    axios.post(url, {
        // email: data.email,
        // username: data.username,
        // password_digest: data.password
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