import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const LeftPart = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 100px
`;

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const ProfileName = styled.h1`
    margin-left: 20px;
`;

const ProfileNav = styled.div`
    margin-left: 20px;
    display: flex;
    gap: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  padding: 20px;
  border-left: 1px solid #ccc;
//   border-radius: 5px;
  flex: 2;
  height: 100vh;
`;

const ProfilePicture = styled.div`
  img {
    border-radius: 50%;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
`;

const Follow = styled.div`
  display: flex;
  gap: 20px;
`;

const FollowButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  width: 80px;

  &:hover {
    background-color: #3498db;
  }
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  width: 120px;

  &:hover {
    background-color: #3498db;
  }
`;

const Profile = () => {
  return (
    // <Router>
    <div>
        <Navbar />
        <ProfileContainer>
            <LeftPart>
                <LeftContent >
                    <ProfileName>Abhishek</ProfileName>
                    <ProfileNav>
                        <Link to="">Home</Link>
                        <Link to="about">About</Link>
                    </ProfileNav>
                    <hr />
                {/* <Post /> */}
                </LeftContent>
                <Routes>
                    <Route path="" element = {<Post />} />
                    <Route path="about" element = {<div>Content for Button B</div>} />
                </Routes>
            </LeftPart>
            <ProfileDetails>
                <ProfilePicture>
                    <img src="https://via.placeholder.com/100" alt="Profile" />
                </ProfilePicture>
                <ProfileInfo>
                    <h2>Abhishek</h2>
                    <Button>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </Button>
                    <Follow>
                        <p>Followers: 1000</p>
                        <p>Following: 500</p>
                    </Follow>
                    <FollowButton>Follow</FollowButton>
                </ProfileInfo>
            </ProfileDetails>
        </ProfileContainer>
    </div>
    // </Router>
  );
};

export default Profile;
