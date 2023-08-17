import React, { useEffect, useState } from 'react'
import { currentUser } from '../../service/current_user';

function ListItem({userId}) {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        setLists(JSON.parse(localStorage.getItem("lists")) || []);
    }, [])

    // console.log(lists);

    let currUserList = [];
    const getUserList = () => {
        lists.forEach(list => {
            if (list.listId === userId) {
                currUserList.push(list);
            }
        })
    }
    getUserList();

    console.log(lists, currUserList);

    return (
        <div>
            {currUserList.length && currUserList.map((list, index) => {
                return <div key = {index}>{list.listName}</div>
            })}
        </div>
    )
}

export default ListItem