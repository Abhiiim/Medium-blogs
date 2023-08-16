import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { Routes, Route, useNavigate, createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { currentUser } from '../../service/current_user';
import { userProfile } from '../../service/user_profile';
import SavedPosts from './SavedPosts';
import ProfilePosts from './ProfilePosts';

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-left: 1px solid #ccc;
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

const OtherDetails = styled.div`
  border-top: 1px solid black;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Div3 = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Profile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate()
  const [profile, setProfile] = useState([]);

  async function fetchProfile(currUser) {
    setProfile(await userProfile(currUser));
  }

  async function fetchUser() {
    setUser(await currentUser());
  }
  useEffect(() => {
    fetchUser()
    fetchProfile(user);
    // setProfile(userProfile(user));
  }, [])


  const editProfile = () => {
    navigate("/user/edit_profile");
  }

  const handleFollow = () => {

  }

  // console.log(profile);

  function showSavedPosts() {
    navigate("/user/profile/saved");
  }

  return (
    <div>
      <Navbar />
      <ProfileContainer>
        <Routes>
          <Route path="/" element={<ProfilePosts user={user} profile={profile} />}></Route>
          <Route path="/saved" element={<SavedPosts />}></Route>
        </Routes>
        <ProfileDetails>
          <ProfilePicture>
            <img src="https://via.placeholder.com/100" alt="Profile" />
          </ProfilePicture>
          <ProfileInfo>
            <h2>{profile.name}</h2>
            <p>Bio: {profile.bio}</p>
            <div>Interested Topics:</div>
              {profile.interested_topics && profile.interested_topics.map((val) => (
                <div>val</div>
              ))}
            <Button onClick={() => editProfile()}>
              <FontAwesomeIcon icon={faEdit} /> Create Profile
            </Button>
            <Follow>
              <p>Followers: 1000</p>
              <p>Following: 500</p>
            </Follow>
            <FollowButton onClick={handleFollow}>Follow</FollowButton>
          </ProfileInfo>
          <OtherDetails>
            <Link to="/user/profile">Home</Link>
            <Link to="/user/profile/saved">Saved Post</Link>
            <Div3>Lists</Div3>
          </OtherDetails>
        </ProfileDetails>
      </ProfileContainer>
    </div>
  );
};

export default Profile;
