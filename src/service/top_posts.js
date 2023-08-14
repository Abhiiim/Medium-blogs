import axios from "axios";

let top_post_url = 'http://localhost:3000/top_posts';

export async function getTopPosts () {
    try {
        const res = await axios.get(top_post_url, {
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}