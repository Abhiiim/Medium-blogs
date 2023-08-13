import axios from "axios";

const url = "http://localhost:3000/login"

export const login = (data) => {
    // console.log(data);
    axios.post(url, {
        email: data.email,
        password: data.password
    }, {
        withCredentials: true,
        headers:{
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}