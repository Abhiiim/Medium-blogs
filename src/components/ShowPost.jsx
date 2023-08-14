import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faSave, faShare } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

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

    const data = useLocation();

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const datetime = new Date(data.state.created_at);
    const date = datetime.getDate() + " " + month[datetime.getMonth()] + " " + datetime.getFullYear()

    return (
        <div>
            <Navbar />
            <ContainerDiv>
                <Title>{data.state.title}</Title>
                <Author>
                    <Img src="https://via.placeholder.com/20" alt="" />
                    <Div1>
                        <Div2 style={{ fontSize: "14px" }}>
                            <div>{data.state.author}</div>
                            <div>Follow</div>
                        </Div2>
                        <Div2 style={{ fontSize: "12px" }}>
                            <div>{data.state.minutes_to_read} min</div>
                            <div>{date}</div>
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
                    {data.state.description}
                </div>
            </ContainerDiv>
        </div>
    )
}

export default ShowPost;