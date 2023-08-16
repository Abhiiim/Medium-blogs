import axios from "axios";

let rec_post_url = 'http://localhost:3000/recommended_posts';

export async function getRecPosts () {
    try {
        const res = await axios.get(rec_post_url, {
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}