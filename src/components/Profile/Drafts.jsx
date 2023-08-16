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

const Drafts = () => {
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

  const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
//   console.log(drafts);

  let currentDraft = [];
  function retrieveDraft () {
    drafts.forEach((item) => {
      if (item.userId === user.id) {
        currentDraft.push(item.post);
      }
    })
  }
  retrieveDraft();

//   console.log(currentDraft);

  return (
    <LeftPart>
      <LeftContent >
        <ProfileName>Drafts</ProfileName>
        {currentDraft.length && currentDraft.map((item, index) => {
          return (
            <Post key={index} post={item} />
          )
        })
        }
      </LeftContent>
    </LeftPart>
  );
};

export default Drafts;
