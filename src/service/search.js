import axios from "axios";

const url = 'http://localhost:3000/search';

export async function searchedPost(params = {}) {
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