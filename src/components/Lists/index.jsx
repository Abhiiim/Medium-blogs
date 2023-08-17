import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import ListItem from './ListItem';
import { currentUser } from '../../service/current_user';
import { useNavigate } from 'react-router-dom';

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
`;

function ListView() {
    const [listName, setListName] = useState("");
    const [user, setUser] = useState("");
    const lists = JSON.parse(localStorage.getItem("lists")) || [];
    const navigate = useNavigate();

    async function fetchUser(){
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
            lists.push({
                listId: user.id,
                listName: listName
            });
            localStorage.setItem("lists", JSON.stringify(lists));
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