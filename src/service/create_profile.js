import axios from "axios";

const url = "http://localhost:3000/profiles/create_profile"

export const create_profile = (data) => {
    axios.post(url, {
        withCredentials: true,
        headers: {
            credentials: true
        }
    }, {
        bio: data.bio,
        name: data.name,
        interested_topics: data.interested_topics
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}