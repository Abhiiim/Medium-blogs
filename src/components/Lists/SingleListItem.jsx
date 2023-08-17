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

function SingleListItem({ list }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div onClick={openModal}>{list.listName}</div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Menu"
                style={{ overlay: overLay, content: contentCSS }}
            >
                <StyledContainer >
                    <UserList listId={list.listId} />
                </StyledContainer>
            </Modal>
        </>
    )
}

export default SingleListItem;