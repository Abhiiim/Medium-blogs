import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faSave, faShare } from '@fortawesome/free-solid-svg-icons';

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    align-items: center;
    margin: auto;
    gap: 20px;
`;

const Title = styled.div`
    margin-top: 50px;
    font-size: 28px;
    font-weight: 700;
`;

const Author = styled.div`
    display: flex;
    align-self: flex-start;
    gap: 20px;
    align-items: center;
`;

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Div1 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px
`;

const Div2 = styled.div`
    display: flex;
    gap: 20px;
`;

const MiddleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 0.1px solid #e8e3e3;
    padding: 10px;
    border-radius: 5px;
`;

const MiddleActivity = styled.div`
    display: flex;
    gap: 20px;
`;

// const Content = styled.div``

function ShowPost() {
  return (
    <div>
        <Navbar />
        <ContainerDiv>
            <Title>6 Best Practices For Creating High-Quality React Apps</Title>
            <Author>
                <Img src="https://via.placeholder.com/20" alt="" />
                <Div1>
                    <Div2 style={{fontSize: "14px"}}>
                        <div>Abhishek</div>
                        <div>Follow</div>
                    </Div2>
                    <Div2 style={{fontSize: "12px"}}>
                        <div>2 min read</div>
                        <div>5 Aug 2023</div>
                    </Div2>
                </Div1>
            </Author>
            <MiddleDiv>
                <MiddleActivity>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <FontAwesomeIcon icon={faComment} />
                </MiddleActivity>
                <MiddleActivity>
                    <FontAwesomeIcon icon={faSave} />
                    <FontAwesomeIcon icon={faShare} />
                </MiddleActivity>
            </MiddleDiv>
            <div>
                <p>
                ReactJS is a well-known JavaScript library for creating UI that is used in both small and big projects. <br/><br/>
                It offers a strong and flexible method for creating reusable components that may be easily combined to create complex UI.<br/><br/>
                However, just like any other technology, there are best practices to follow to create high-quality, maintainable, and robust apps.<br/><br/>
                In this post, we’ll look at some of the best practices to use when working with ReactJS.<br/><br/>
                Using functional components and hooks instead of class components is one of the most important React best practices.<br/><br/>
                Functional components are simpler, easier to read and perform better.<br/><br/>
                Hooks, on the other hand, allow the use of state and other React features inside functional components.<br/><br/>
                They also help to structure and reason your code by making it clearer what state and logic are associated with a specific component.<br/><br/>
                </p>
            </div>
        </ContainerDiv>
    </div>
  )
}

export default ShowPost;