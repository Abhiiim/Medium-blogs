import React, { useEffect, useState } from 'react'
import SingleListItem from './SingleListItem';

function ListItem({userId}) {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        setLists(JSON.parse(localStorage.getItem("lists")) || []);
    }, [])

    // console.log(lists);

    let currUserList = [];
    const getUserList = () => {
        lists.forEach(list => {
            if (list.userId === userId) {
                currUserList.push(list);
            }
        })
    }
    getUserList();

    // console.log(lists, userId);

    return (
        <div>
            {currUserList.length && currUserList.map((list, index) => {
                return <SingleListItem list={list} userId={userId} />
            })}
        </div>
    )
}

export default ListItem