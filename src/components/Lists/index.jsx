import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import ListItem from './ListItem';
import { currentUser } from '../../service/current_user';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';

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
    // align-items: start;
`;

const ProfileName = styled.h1`
    // margin-left: 20px;
`;

const CreateList = styled.div`
    display: flex;
    gap: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
`;

function ListView() {
    const [listName, setListName] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    async function fetchUser() {
        setUser(await currentUser());
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleList = (e) => {
        setListName(e.target.value);
    }

    const createList = () => {
        if (listName.trim() !== "") {
            const lists = JSON.parse(localStorage.getItem("lists")) || [];
            let currId = JSON.parse(localStorage.getItem("list_id")) || 0;
            currId = parseInt(currId);
            lists.push({
                listId: currId,
                userId: user.id,
                listName: listName
            });
            currId++;
            localStorage.setItem("lists", JSON.stringify(lists));
            localStorage.setItem("list_id", JSON.stringify(currId));
        }
    }

    return (
        <LeftPart>
            <LeftContent >
                <ProfileName>Lists</ProfileName>
                <CreateList>
                    <div>Create a List: </div>
                    <input type="text" value={listName} onChange={handleList} />
                    <button onClick={createList}>Create</button>
                </CreateList>
                <ListItem userId={user.id} />
            </LeftContent>
        </LeftPart>
    )
}

export default ListView;