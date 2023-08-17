import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { currentUser } from '../../service/current_user';
import { faPersonRays } from '@fortawesome/free-solid-svg-icons';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const List = styled.div`
  cursor: pointer;
`;

function PopupList({post}) {
  const [user, setUser] = useState("");

  async function fetchUser() {
    setUser(await currentUser());
  }

  useEffect(() => {
    fetchUser();
  }, [])

  const lists = JSON.parse(localStorage.getItem("lists"));

  let currUserList = [];
  const getUserList = () => {
    lists.forEach(list => {
      if (list.userId === user.id) {
        currUserList.push(list);
      }
    })
  }
  getUserList();

  const addItem = (listId) => {
    const postItem = {
      listId: listId,
      userId: user.id,
      postId: post.id,
      post: post
    }
    const listItems = JSON.parse(localStorage.getItem("list_items")) || [];
    const found = listItems.some((item) => {
      return (item.listId === listId && item.userId === user.id && item.postId === post.id);
    })
    if (!found) {
      listItems.push(postItem);
      localStorage.setItem("list_items", JSON.stringify(listItems));
    }
    // console.log(listItems);
  }

  return (
    <MainDiv>
      {currUserList.length &&
        currUserList.map((list, index) => {
          return (
            <List onClick={() => addItem(list.listId)} key={index}>{list.listName}</List>
          )
        })
      }
    </MainDiv>
  )
}

export default PopupList