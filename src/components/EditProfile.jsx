import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

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

function EditProfile() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [interests, setInterests] = useState('');

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form submission logic here
        console.log('Form data:', {
            image,
            name,
            email,
            interests,
        });
    };

    return (
        <div>
            <Navbar />
            <FormContainer>
                <h1>Profile Form</h1>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="image">Profile Image:</Label>
                    <Input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    {image && <ImagePreview src={image} alt="Profile Preview" />}
                    <Label htmlFor="name">Name:</Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Label htmlFor="interests">Interests:</Label>
                    <TextArea id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
                    <Button type="submit">Submit</Button>
                </form>
            </FormContainer>
        </div>
    );
}

export default EditProfile;
