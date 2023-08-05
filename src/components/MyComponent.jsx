import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const LeftColumn = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const AuthorName = styled.p`
  font-weight: bold;
`;

const Title = styled.h2`
  margin: 5px 0;
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
`;

const FullContentLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: #007bff;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
`;

const MyComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

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

  return (
    <Container>
      <LeftColumn>
        <AuthorName>Author Name</AuthorName>
        <Title>Title</Title>
        <Content ref={contentRef}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          porttitor libero eget quam lacinia varius. Fusce fringilla elit
          tellus, sit amet rhoncus tortor vulputate in. Nulla facilisi.
          Phasellus in velit eu purus vulputate cursus vel id ligula. Nam
          et est lorem.{' '}
          {isExpanded ? null : (
            <FullContentLink onClick={handleToggleExpand} href="#">
              ...Read more
            </FullContentLink>
          )}
        </Content>
        {isExpanded ? (
          <FullContentLink href="#">Open Full Content</FullContentLink>
        ) : null}
      </LeftColumn>
      <RightColumn>
        <Image
          src="https://via.placeholder.com/200"
          alt="Sample Image"
        />
      </RightColumn>
    </Container>
  );
};


export default MyComponent;