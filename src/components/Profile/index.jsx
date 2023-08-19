import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { Routes, Route, useNavigate, createBrowserRouter, RouterProvider, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { currentUser } from '../../service/current_user';
import { userProfile } from '../../service/user_profile';
import SavedPosts from './SavedPosts';
import ProfilePosts from './ProfilePosts';
import Drafts from './Drafts';
import ListView from '../Lists/index';
import FollowersModal from './FollowersModal';
import FollowingModal from './FollowingModal';

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
  flex-direction: column;
  gap: 10px;
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
  margin: 20px 0;

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

const NavButton = styled.div`
  background-color: none;
  border: none;
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState([]);

  const userData = useLocation();
  console.log(userData);

  async function fetchProfile() {
    const userId = userData.state.id;
    setProfile(await userProfile(userId));
  }
  useEffect(() => {
    fetchProfile();
  }, [])


  const editProfile = () => {
    navigate("/user/edit_profile");
  }

  // console.log(profile);

  function handleProfile () {
    navigate("/user/profile", {state: userData.state})
  }
  function handleSavedPosts() {
    navigate("/user/profile/saved", {state: userData.state});
  }
  function handleDrafts() {
    navigate("/user/profile/draft", {state: userData.state});
  }
  function handleLists() {
    navigate("/user/profile/lists", {state: userData.state});
  }

  return (
    <div>
      <Navbar />
      <ProfileContainer>
        <Routes>
          <Route path="/" element={<ProfilePosts user={userData.state} profile={profile} />}></Route>
          <Route path="/saved" element={<SavedPosts />}></Route>
          <Route path="/draft" element={<Drafts />}></Route>
          <Route path="/lists" element={<ListView />}></Route>
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
              <div>{val}</div>
            ))}
            <Button onClick={() => editProfile()}>
              <FontAwesomeIcon icon={faEdit} /> Create Profile
            </Button>
            <Follow>
              <FollowersModal userId={userData.state.id} />
              <FollowingModal userId={userData.state.id} />
            </Follow>
          </ProfileInfo>
          <OtherDetails>
            <NavButton onClick={handleProfile}>Home</NavButton>
            <NavButton onClick={handleSavedPosts}>Saved Post</NavButton>
            <NavButton onClick={handleDrafts}>Drafts</NavButton>
            <NavButton onClick={handleLists}>Lists</NavButton>
          </OtherDetails>
        </ProfileDetails>
      </ProfileContainer>
    </div>
  );
};

export default Profile;
