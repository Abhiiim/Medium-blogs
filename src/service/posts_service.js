import axios from "axios";

const url = 'http://localhost:3000/articles';
let create_url = 'http://localhost:3000/create';

export async function getPost(params = {}) {
    try {
        const res = await axios.get(url, {
            params: params,
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

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
        headers: {
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}