import axios from "axios";

const url = 'http://localhost:3000/articles';
let create_url = 'http://localhost:3000/create';
let edit_url = 'http://localhost:3000/update';
let delete_url = 'http://localhost:3000/delete';

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
    axios.post(create_url, {
        title: data.title,
        topic: data.topic,
        description: data.content,
        author: data.author,
        user_id: data.user_id
    }, {
        withCredentials: true,
        headers: {
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

export const editPost = (data) => {
    axios.put(edit_url, {
        id: data.id,
        title: data.title,
        topic: data.topic,
        description: data.content,
    }, {
        withCredentials: true,
        headers: {
            credentials: true
        }

    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

export const deletePost = (params = {}) => {
    axios.delete(delete_url,{
        params: params,
        withCredentials: true,
        headers: {
            credentials: true
        }
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

