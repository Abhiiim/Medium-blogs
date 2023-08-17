import React, { useState } from 'react';
import {Container, InputForm, Input, Button} from "./Style";
import { login } from '../service/login';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password.value,
    }
    await login(data);
    try {
      navigate("/");
    } catch (err) {
      console.log("Unsuccessful attempt" + err);
    }
  };

  return (
    <>
    <Navbar />
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </InputForm>
    </Container>
    </>
  );
};

export default Login;
