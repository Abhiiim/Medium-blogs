import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getPost } from '../service/posts_service';

const Container = styled.div`
  max-width: 650px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FilterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
//   flex-direction: column;
`;

const FilterLabel = styled.label`
  font-weight: bold;
`;

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Filter = ({setFilteredPosts}) => {
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortType, setSortType] = useState("");

  async function fetchData (params) {
    setFilteredPosts(await getPost(params))
  }

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  }

  const handleSort = () => {
    let params = {};
    if (sortType === "likes") {
      params = {sort_like: 'true'}
    } else if (sortType === "comments") {
      params = {sort_comments: 'true'};
    }
    fetchData(params);
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {
      author: filterAuthor,
      date: filterDate
    }
    fetchData(params)
  };

  return (
    <Container>
      <FilterForm onSubmit={handleFilterSubmit}>
        <FilterLabel>Filter by Author:</FilterLabel>
        <FilterInput
          type="text"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          placeholder="Enter author name"
        />

        <FilterLabel>Filter by Date:</FilterLabel>
        <FilterInput
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          placeholder="Enter date"
        />

        <FilterButton type="submit">Filter</FilterButton>
      </FilterForm>
      
      <div className="sort">
        <select name="" id="sort" onChange={handleSortChange}>
          <option value="likes">sort by likes</option>
          <option value="comments">sort by comments</option>
        </select>
        <button onClick={handleSort}>Sort</button>
      </div>

    </Container>
  );
};

export default Filter;
