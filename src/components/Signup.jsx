import React, { useState } from 'react';
import {Container, InputForm, Input, Button} from "./Style";
import { register } from '../service/register';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    // console.log(formData);
    register(formData);

    navigate("/login")
  };

  return (
    <>
    <Navbar />
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </InputForm>
    </Container>
    </>
  );
};

export default Signup;
