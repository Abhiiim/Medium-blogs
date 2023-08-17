import React from 'react'
import { styled } from 'styled-components'

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const List = styled.div`
  cursor: pointer;
`;

function PopupList() {
  const lists = JSON.parse(localStorage.getItem("lists"))

  const addItem = () => {

  }

  return (
    <MainDiv>
      {lists.length &&
        lists.map((list, index) => {
          return (
            <List onClick={addItem} key={index}>{list.listName}</List>
          )
        })
      }
    </MainDiv>
  )
}

export default PopupList