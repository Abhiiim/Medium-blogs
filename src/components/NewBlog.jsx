import React, { useState } from 'react';
import styled from 'styled-components';
import {Button} from "./Style";
import Navbar from './Navbar';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;

const NewBlog = () => {
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // You can process the image file here (e.g., upload to server, preview, etc.)
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };

  return (
    <div>
        <Navbar />
        <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Create New Blog</FormTitle>
        <FormField>
            <Label>Title:</Label>
            <Input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Enter the heading"
            />
        </FormField>
        <FormField>
            <Label>Content:</Label>
            <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter the text content"
            rows="6"
            />
        </FormField>
        <FormField>
            <Label>Topic:</Label>
            <Input
            type="text"
            name="topic"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Enter the topic"
            />
        </FormField>
        <FormField>
            <Label>Image:</Label>
            <ImageInput
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            />
            <ImageLabel htmlFor="image">Choose Image</ImageLabel>
        </FormField>
        <Button type="submit" style={{fontSize: '16px'}}>Add Blog</Button>
        </FormContainer>
    </div>
  );
};

export default NewBlog;
