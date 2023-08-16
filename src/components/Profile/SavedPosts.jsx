import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPost } from '../../service/posts_service';
import { currentUser } from '../../service/current_user';
import Post from '../Post';

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

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  async function fetchPosts() {
    const pst = await getPost();
    setPosts(pst || []);
  }
  async function fetchUser() {
    setUser(await currentUser());
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [])

  const savedPost = JSON.parse(localStorage.getItem("saved_posts"));
  // console.log(posts, savedPost, user);

  let currentSavedPost = [];
  function retrieveSavedPost () {
    savedPost.forEach((item) => {
      if (item.userId === user.id) {
        posts.forEach((post) => {
          if (post.id === item.articleId) {
            currentSavedPost.push(post);
          }
        })
      }
    })
  }
  retrieveSavedPost();

  console.log(currentSavedPost);

  return (
    <LeftPart>
      <LeftContent >
        <ProfileName>Saved Posts</ProfileName>
        {currentSavedPost.length && currentSavedPost.map((item, index) => {
          return (
            <Post key={index} post={item} />
          )
        })
        }
      </LeftContent>
    </LeftPart>
  );
};

export default SavedPosts;
