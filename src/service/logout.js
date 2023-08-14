import axios from "axios";

const url = "http://localhost:3000/logout"

export const logout = () => {
    axios.delete(url, {
        withCredentials: true,
        headers:{
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}