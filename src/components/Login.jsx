import React, { useState } from 'react';
import {Container, InputForm, Input, Button} from "./Style";
import { login } from '../service/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
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
    const loginData = formData;
    loginData.password_confirmation = formData.password;
    setFormData(loginData); 
    login(formData);
    navigate("/");
  };

  return (
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <Button type="submit">Login</Button>
      </InputForm>
    </Container>
  );
};

export default Login;
