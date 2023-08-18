import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components';
import { getPost } from '../../service/posts_service';
import Post from '../Post';
import { currentUser } from '../../service/current_user';
import Modal from 'react-modal';
import { userProfile } from '../../service/user_profile';

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

const FollowDiv = styled.div`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: blue;
    }
`;

const StyledContainer = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const overLay = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
}

const contentCSS = {
    position: 'static',
    borderRadius: 'none',
    padding: 0,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
}

function AuthorProfile() {
    const [posts, setPosts] = useState([]);
    const data = useLocation();
    // console.log(data.state);
    const [user, setUser] = useState("");
    const [isFollow, setIsFollow] = useState(false);
    const [followers, setFollowers] = useState(() => {
        return JSON.parse(localStorage.getItem("followers")) || [];
    });
    const [profile, setProfile] = useState([]);

    async function fetchUser() {
        setUser(await currentUser());
    }
    async function fetchProfile() {
        const url = "http://localhost:3000/profiles/11"// + user.id;
        setProfile(await userProfile(url));
    }
    useEffect(() => {
        fetchUser();
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
            return (item.userId === data.state.user_id && item.followerId === user.id);
        })
        if (alreadyFollow) {
            isFollowed = true;
        }
    }
    checkIsFollow();

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
        const alreadyFollow = followers.some(item => {
            return (item.userId === data.state.user_id && item.followerId === user.id);
        })
        if (!alreadyFollow) {
            const follow = {
                userId: data.state.user_id,
                followerId: user.id,
                follower: profile.name,
                following: data.state.author
            }
            setIsFollow(true);
            setFollowers([...followers, follow]);
        } else {
            let foll = followers;
            const indexToRemove = foll.findIndex(item => (
                item.userId === data.state.user_id && item.followerId === user.id
            ));
            foll.splice(indexToRemove, 1);
            setIsFollow(false);
            setFollowers([...foll]);
        }
    }

    let followersCount = 0, followingCount = 0;
    let currFollowers = [], currFollowing = [];
    const getCount = () => {
        followers.forEach(item => {
            if (item.userId === data.state.user_id) {
                followersCount++;
                currFollowers.push(item.follower)
            }
            if (item.followerId === data.state.user_id) {
                followingCount++;
                currFollowing.push(item.following);
            }
        })
    }
    getCount();

    useEffect(() => {
        localStorage.setItem("followers", JSON.stringify(followers));
    }, [followers.length])

    console.log(followers, currFollowers, currFollowing);

    const [followerModalIsOpen, setFollowerModalIsOpen] = useState(false);
    const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
    const openFollowerModal = () => {
        setFollowerModalIsOpen(true);
    };
    const openFollowingModal = () => {
        setFollowingModalIsOpen(true);
    };
    const closeModal = () => {
        setFollowerModalIsOpen(false);
        setFollowingModalIsOpen(false);
    };

    return (
        <Container>
            <h1>Profile</h1>
            <AuthorDiv>
                <AuthorName>Name: <span style={{ fontWeight: "600" }}>{data.state.author}</span></AuthorName>
                <Follow>
                    <FollowDiv onClick={openFollowerModal}>Followers: {followersCount}</FollowDiv>
                    <Modal
                        isOpen={followerModalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Menu"
                        style={{ overlay: overLay, content: contentCSS }}
                    >
                        <StyledContainer>
                            <ul style={{paddingLeft: "0", margin: "0"}}>
                                {currFollowers.length 
                                    ? currFollowers.map((item, index) => {
                                        return <li key={index} style={{marginBottom: "10px"}}>{item}</li>
                                    })
                                    : <div>No Followers</div>
                                }
                            </ul>
                            <button style={{ marginTop: "10px" }} onClick={closeModal}>Close</button>
                        </StyledContainer>
                    </Modal>

                    <FollowDiv onClick={openFollowingModal}>Following: {followingCount}</FollowDiv>
                    <Modal
                        isOpen={followingModalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Menu"
                        style={{ overlay: overLay, content: contentCSS }}
                    >
                        <StyledContainer>
                            <ul style={{paddingLeft: "0", margin: "0"}}>
                                {currFollowing.length 
                                    ? currFollowing.map((item, index) => {
                                        return <li key={index} style={{marginBottom: "10px"}}>{item}</li>
                                    })
                                    : <div>No Following</div>
                                }
                            </ul>
                            <button style={{ marginTop: "10px" }} onClick={closeModal}>Close</button>
                        </StyledContainer>
                    </Modal>
                </Follow>
                <FollowButton onClick={handleFollow}>{(isFollow || isFollowed) ? "Unfollow" : "Follow"}</FollowButton>
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