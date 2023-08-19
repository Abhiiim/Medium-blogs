import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components';
import { getPost } from '../../service/posts_service';
import Post from '../Post';
import { currentUser } from '../../service/current_user';
import Modal from 'react-modal';
import { userProfile } from '../../service/user_profile';
import Navbar from '../Navbar';
import FollowersModal from './FollowersModal';
import FollowingModal from './FollowingModal';

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

const Follow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

function AuthorProfile() {
    const [posts, setPosts] = useState([]);
    const data = useLocation();
    // console.log(data);
    const [isFollow, setIsFollow] = useState(false);
    const [followers, setFollowers] = useState(() => {
        return JSON.parse(localStorage.getItem("followers")) || [];
    });
    const [profile, setProfile] = useState([]);

    async function fetchProfile() {
        const userId = data.state.user.id;
        setProfile(await userProfile(userId));
    }
    useEffect(() => {
        fetchProfile();
    }, [])

    async function fetchPosts() {
        const authorPosts = await getPost();
        setPosts(authorPosts || []);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    let isFollowed = false;
    const checkIsFollow = () => {
        const alreadyFollow = followers.some(item => {
            return (item.userId === data.state.profile.user_id && item.followerId === data.state.user.id);
        })
        if (alreadyFollow) {
            isFollowed = true;
        }
    }
    checkIsFollow();

    let profilePosts = [];
    function getProfilePosts() {
        posts.forEach((item) => {
            if (item.user_id === data.state.profile.user_id) {
                profilePosts.push(item);
            }
        })
    }
    getProfilePosts();

    const handleFollow = () => {
        const alreadyFollow = followers.some(item => {
            return (item.userId === data.state.profile.user_id && item.followerId === data.state.user.id);
        })
        if (!alreadyFollow) {
            const follow = {
                userId: data.state.profile.user_id,
                followerId: data.state.user.id,
                follower: profile.name,
                following: data.state.profile.author
            }
            setIsFollow(true);
            setFollowers([...followers, follow]);
        } else {
            let foll = followers;
            const indexToRemove = foll.findIndex(item => (
                item.userId === data.state.profile.user_id && item.followerId === data.state.user.id
            ));
            foll.splice(indexToRemove, 1);
            setIsFollow(false);
            setFollowers([...foll]);
        }
    }

    useEffect(() => {
        localStorage.setItem("followers", JSON.stringify(followers));
    }, [followers.length])

    // console.log(followers, currFollowers, currFollowing);

    return (
        <>
            <Navbar />
            <Container>

                <h1>Profile</h1>
                <AuthorDiv>
                    <AuthorName>Name: <span style={{ fontWeight: "600" }}>{data.state.profile.author}</span></AuthorName>
                    <Follow>
                        <FollowersModal userId={data.state.profile.user_id} />
                        <FollowingModal userId={data.state.profile.user_id} />
                    </Follow>
                    <FollowButton onClick={handleFollow}>{(isFollow || isFollowed) ? "Unfollow" : "Follow"}</FollowButton>
                </AuthorDiv>
                <AuthorPost>
                    <h2>{data.state.profile.author}'s Posts</h2>
                    {profilePosts.length && profilePosts.map((item, index) => {
                        return (
                            <Post key={index} post={item} />
                        )
                    })}
                </AuthorPost>
            </Container>
        </>
    )
}

export default AuthorProfile