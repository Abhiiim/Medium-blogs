import React from 'react'
import { styled } from 'styled-components';

const Div1 = styled.div`
    border: 1px solid #e8e3e3;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;

function UserList() {
    const lists = JSON.parse(localStorage.getItem("lists"))

    return (
        <div>
            {/* {lists.length &&
                lists.map((post, index) => {
                    return (
                        <Div1 onClick={() => seeBlogDetails(post)} key={index}>
                            <div style={{ fontSize: "14px" }}>{post.author}</div>
                            <h4 style={{ marginTop: "10px" }}>{post.title}</h4>
                        </Div1>
                    )
                })
            } */}
            UserList
        </div>
    )
}

export default UserList