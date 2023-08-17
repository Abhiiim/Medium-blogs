import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faSave, faShare } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { currentUser } from '../service/current_user';
import PopupList from './Lists/PopupList';

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
    align-items: center;
`;

const AddList = styled.div`
    font-size: 24px;
    border: none;
    background: none;
    cursor: pointer;
`;

const StyledContainer = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const overLay = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
}

const contentCSS = {
    position: 'static',
    borderRadius: 'none',
    padding: 0,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
}

function ShowPost() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(() => {
        return JSON.parse(localStorage.getItem("comments")) || []
    });
    const [user, setUser] = useState("");
    const [savedPosts, setSavedPosts] = useState(() => {
        return JSON.parse(localStorage.getItem("saved_posts")) || []
    })

    async function fetchUser() {
        setUser(await currentUser());
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const data = useLocation();

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const datetime = new Date(data.state.created_at);
    const date = datetime.getDate() + " " + month[datetime.getMonth()] + " " + datetime.getFullYear()

    function handleComment(e) {
        setComment(e.target.value);
    }

    function addComment() {
        let newComment = {
            articleId: data.state.id,
            comment: comment
        }
        setComments([...comments, newComment]);
    }

    let cnt = 0;
    function countComments() {
        comments.forEach(item => {
            if (item.articleId === data.state.id) cnt++;
        })
    }
    countComments();

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [comments])

    function handleSave() {
        let saved = JSON.parse(localStorage.getItem("saved_posts")) || [];
        const isAlreadySaved = saved.some((item) => item.userId === user.id && item.articleId === data.state.id);
        if (!isAlreadySaved) {
            const newSave = {
                userId: user.id,
                articleId: data.state.id,
            }
            setSavedPosts([...savedPosts, newSave])
        }
    }

    useEffect(() => {
        localStorage.setItem("saved_posts", JSON.stringify(savedPosts));
    }, [savedPosts])

    // console.log(savedPosts);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
                        <span><FontAwesomeIcon icon={faComment} />
                            <span style={{ fontSize: "12px" }}> {cnt}</span>
                        </span>
                    </MiddleActivity>
                    <MiddleActivity>
                        <FontAwesomeIcon onClick={handleSave} icon={faSave} />
                        <AddList onClick={openModal}>+</AddList>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Menu"
                            style={{ overlay: overLay, content: contentCSS }}
                        >
                            <StyledContainer>
                                <PopupList post={data.state} />
                                <button style={{marginTop: "10px"}} onClick={closeModal}>Close</button>
                            </StyledContainer>
                        </Modal>
                    </MiddleActivity>
                </MiddleDiv>
                <div>
                    {data.state.description}
                </div>
                <div>
                    <div>Add Comment</div>
                    <input type="text" onChange={handleComment} />
                    <button onClick={addComment}>Add</button>
                </div>
                {comments.length && comments.map((item, index) => {
                    if (item.articleId == data.state.id) {
                        return <div key={index}>{item.comment}</div>
                    }
                })}
            </ContainerDiv>
        </div>
    )
}

export default ShowPost;