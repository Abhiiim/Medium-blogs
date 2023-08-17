import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Div1 = styled.div`
    border: 1px solid #e8e3e3;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;

function UserList({listId}) {
    const navigate = useNavigate();
    const listItems = JSON.parse(localStorage.getItem("list_items"))
    let currListItems = [];
    listItems.forEach(item => {
        if (item.listId === listId) {
            currListItems.push(item.post);
        }
    })

    console.log(listId);

    const seeBlogDetails = (data) => {
        navigate("/author/title", {state: data});
    }

    return (
        <div>
            {currListItems.length &&
                currListItems.map((post, index) => {
                    return (
                        <Div1 onClick={() => seeBlogDetails(post)} key={index}>
                            <div style={{ fontSize: "14px" }}>{post.author}</div>
                            <h4 style={{ marginTop: "10px" }}>{post.title}</h4>
                        </Div1>
                    )
                })
            }
        </div>
    )
}

export default UserList