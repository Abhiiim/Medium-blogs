import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

  const savedPost = JSON.parse(localStorage.getItem("saved_posts"));
  console.log(savedPost);

  return (
    <LeftPart>
      <LeftContent >
        <ProfileName>Saved Posts</ProfileName>
      </LeftContent>
    </LeftPart>
  );
};

export default SavedPosts;
