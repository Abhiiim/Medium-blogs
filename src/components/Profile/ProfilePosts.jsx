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


const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  async function fetchPosts() {
    const params = { author: "Abhishek" };
    const pst = await getPost(params);
    setPosts(pst || []);
  }

  useEffect(() => {
    fetchPosts();
  }, [])
  return (
    <LeftPart>
      <LeftContent >
        <ProfileName>Abhishek</ProfileName>
        <ProfileNav>
          <Link to="">Home</Link>
          <Link to="about">About</Link>
        </ProfileNav>
        <hr />
        {posts.length && posts.map((item, index) => {
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
