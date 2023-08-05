import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 600px;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 10px;
  justify-content: center;
  border-radius: 5px;
`;

const LeftColumn = styled.div`
  flex: 8;
  position: relative;
  overflow: hidden;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin: 0;
`;

const Details = styled.div`
    cursor: pointer;
`;

const Title = styled.h2`
  margin: 5px 0;
  font-size: 20px;
`;

const Content = styled.p`
  margin: 0;
  white-space: pre-line;
  line-height: 1.5;
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const FullContentLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: #007bff;
`;

const BottomRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    // margin-top: 10px;
`;

const RightColumn = styled.div`
  flex: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Image = styled.img`
  // max-width: 100%;
  // max-height: 300px;
  display: flex;
  align-items: center;
`;

const Tech = styled.div`
  background-color: #ede9e9;
  padding: 5px; 
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: ${({ isDelete }) => (isDelete ? '#e81e1e' : 'blue')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isDelete }) => (isDelete ? '#e74c3c' : '#3498db')};
  }
`;

const MyComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) {
      const isOverflowed =
        contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsExpanded(isOverflowed);
    }
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const seeBlogDetails = () => {
    navigate("author/title");
  }

  return (
    <Container>
      <LeftColumn>
        <TopRow>
            <AuthorName>Abhishek</AuthorName>
            <div style={{fontSize: "12px"}}>5 Aug 2023</div>
        </TopRow>
        <Details onClick={seeBlogDetails}>
            <Title>6 Best Practices For Creating High-Quality React Apps</Title>
            <Content ref={contentRef}>
              ReactJS is a well-known JavaScript library for creating UI that is used in both small and big projects.

              It offers a strong and flexible method for creating reusable components that may be easily combined to create complex UI.

              However, just like any other technology, there are best practices to follow to create high-quality, maintainable, and robust apps.

              In this post, we’ll look at some of the best practices to use when working with ReactJS.{' '}
            
            </Content>
        </Details>
        <BottomRow>
            <Tech>React</Tech>
            <div style={{fontSize: "14px"}}>2 min</div>
        </BottomRow>
        <BottomRow>
            <Button>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button isDelete>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
        </BottomRow>
      </LeftColumn>
      <RightColumn>
        <Image
          src="https://via.placeholder.com/120"
          alt="Sample Image"
        />
      </RightColumn>
    </Container>
  );
};


export default MyComponent;