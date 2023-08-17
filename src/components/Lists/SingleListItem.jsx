import React, { useState } from 'react'
import Modal from 'react-modal';
import { styled } from 'styled-components';
import UserList from './UserList';

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
    margin: 20px 0;
    text-decoration: underline;
    
    &:hover {
        font-size: 18px;
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

function SingleListItem({ list, userId }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <OpenMenu onClick={openModal}>{list.listName}</OpenMenu>
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