import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { create_profile } from '../service/create_profile';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InterestDiv = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FieldButton = styled.button`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`;

function EditProfile() {
  const [image, setImage] = useState('');
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInterests = (e) => {
    setInterest(e.target.value)
  }

  const handleAddField = () => {
    const updatedFields = [...inputFields, { value: '' }];
    setInputFields(updatedFields);
    setInterests([...interests, interest]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInterests([...interests, interest]);
    const data = {
      bio: e.target.bio.value,
      name: e.target.name.value,
      interested_topics: interests
    }
    // console.log(interests);
    // create_profile(data);
    navigate("/user/profile", {state: data});
  };

  return (
    <div>
      <Navbar />
      <FormContainer>
        <h1>Profile Form</h1>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="image">Profile Image:</Label>
          <Input type="file" id="image" accept="image/*" />
          {image && <ImagePreview src={image} alt="Profile Preview" />}
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" />
          <Label htmlFor="interests">Interests:</Label>
          { inputFields.map((field, index) => (
            <InterestDiv key={index}>
              <Input type="text" name="interests" onChange={handleInterests} />
              <FieldButton onClick={() => handleRemoveField(index)}>-</FieldButton>
            </InterestDiv>
          ))}
          <FieldButton onClick={handleAddField}>+</FieldButton>
          <Label htmlFor="bio">Bio:</Label>
          <TextArea id="bio" />
          <Button type="submit">Submit</Button>
        </form>
      </FormContainer>
    </div>
  );
}

export default EditProfile;
