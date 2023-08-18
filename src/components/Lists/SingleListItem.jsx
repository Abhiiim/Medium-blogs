import React, { useState } from 'react'
import Modal from 'react-modal';
import { styled } from 'styled-components';
import UserList from './UserList';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OpenMenu = styled.div`
    cursor: pointer;
    text-decoration: underline;
    
    &:hover {
        font-size: 18px;
    }
`;

const ListName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c6b6b6;
    border-radius: 5px;
    margin: 20px 0;
    padding: 20px;
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const DeleteButton = styled.button`
    cursor: pointer;
    padding: 10px;
    background-color: #cd1717;
    border-radius: 5px;
    border: none;
    color: white;

    &:hover {
        background-color: #cd1717c2;
    }
`;

const ShareIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: blue;
    font-size: 22px; 
  }
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

function SingleListItem({ index, list, userId }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate ();

    const openModal = () => {
        setModalIsOpen(true);
        // navigate("listitem");
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const deleteList = (index) => {
        const lists = JSON.parse(localStorage.getItem("lists"));
        lists.splice(index, 1);
        localStorage.setItem("lists", JSON.stringify(lists));
    }

    return (
        <>
            <ListName>
                <OpenMenu onClick={openModal}>{list.listName}</OpenMenu>
                <Buttons>
                    <ShareIcon icon={faShare} />
                    <DeleteButton onClick={() => deleteList(index)}>Delete</DeleteButton>
                </Buttons>
            </ListName>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Menu"
                style={{ overlay: overLay, content: contentCSS }}
            >
                <StyledContainer >
                    <UserList listId={list.listId} userId={userId} />
                </StyledContainer>
            </Modal>
        </>
    )
}

export default SingleListItem;