import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../Post';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { getPost } from '../../service/posts_service';

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


const ProfilePosts = ({user, profile}) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  async function fetchPosts() {
    // const params = {author: profile.name}
    const pst = await getPost();
    setPosts(pst || []);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  let profilePosts = [];
  function getProfilePosts () {
    posts.forEach((item) => {
      if (item.user_id === user.id) {
        profilePosts.push(item);
        // console.log(user.id, item.user_id);
      }
    })
  }
  getProfilePosts();

  // console.log(posts);

  return (
    <LeftPart>
      <LeftContent >
        <ProfileName>{profile.name}</ProfileName>
        <hr />
        {profilePosts.length && profilePosts.map((item, index) => {
          return (
            <Post key={index} post={item} />
          )
        })
        }
      </LeftContent>
    </LeftPart>
  );
};

export default ProfilePosts;
