import React from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import { styled } from 'styled-components';

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

function FollowersModal({userId}) {
    const [followerModalIsOpen, setFollowerModalIsOpen] = useState(false);
    const openFollowerModal = () => {
        setFollowerModalIsOpen(true);
    };
    const closeModal = () => {
        setFollowerModalIsOpen(false);
    };

    const followers = JSON.parse(localStorage.getItem("followers")) || [];
    let followersCount = 0, followingCount = 0;
    let currFollowers = [], currFollowing = [];
    const getCount = () => {
        followers.forEach(item => {
            if (item.userId === userId) {
                followersCount++;
                currFollowers.push(item.follower)
            }
            if (item.followerId === userId) {
                followingCount++;
                currFollowing.push(item.following);
            }
        })
    }
    getCount();

    return (
        <>
            <FollowDiv onClick={openFollowerModal}>Followers: {followersCount}</FollowDiv>
            <Modal
                isOpen={followerModalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Menu"
                style={{ overlay: overLay, content: contentCSS }}
            >
                <StyledContainer>
                    <ul style={{ paddingLeft: "0", margin: "0" }}>
                        {currFollowers.length
                            ? currFollowers.map((item, index) => {
                                return <li key={index} style={{ marginBottom: "10px" }}>{item}</li>
                            })
                            : <div>No Followers</div>
                        }
                    </ul>
                    <button style={{ marginTop: "10px" }} onClick={closeModal}>Close</button>
                </StyledContainer>
            </Modal></>
    )
}

export default FollowersModal