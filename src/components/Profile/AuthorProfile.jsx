import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components';
import { getPost } from '../../service/posts_service';
import Post from '../Post';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

const AuthorDiv = styled.div`
    border: 1px solid #cab9b9e0;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
`;

const AuthorName = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`;

const FollowButton = styled.div`
    cursor: pointer;
    width: 100px;
    padding: 5px;
    background-color: blue;
    color: white;
    text-align: center;
    border-radius: 5px;

    &: hover {
        background-color: #2b2b9c;
    }
`;

const AuthorPost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

function AuthorProfile() {
    const [posts, setPosts] = useState([]);
    const data = useLocation();
    // console.log(data.state);

    async function fetchPosts() {
        const params = { autor: data.state.author };
        const authorPosts = await getPost(params);
        setPosts(authorPosts || []);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    let profilePosts = [];
    function getProfilePosts() {
        posts.forEach((item) => {
            if (item.user_id === data.state.user_id) {
                profilePosts.push(item);
            }
        })
    }
    getProfilePosts();

    const handleFollow = () => {
        
    }

    // console.log(profilePosts);

    return (
        <Container>
            <h1>Profile</h1>
            <AuthorDiv>
                <AuthorName>Name: <span style={{ fontWeight: "600" }}>{data.state.author}</span></AuthorName>
                <FollowButton onClick={handleFollow}>Follow</FollowButton>
            </AuthorDiv>
            <AuthorPost>
                <h2>{data.state.author}'s Posts</h2>
                {profilePosts.length && profilePosts.map((item, index) => {
                    return (
                        <Post key={index} post={item} />
                    )
                })}
            </AuthorPost>
        </Container>
    )
}

export default AuthorProfile