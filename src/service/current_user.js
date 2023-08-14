import axios from "axios";

const url = 'http://localhost:3000/current_user';

export async function currentUser () {
    try {
        const res = await axios.get(url, {
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}