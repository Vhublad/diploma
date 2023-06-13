import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_HTTP } from '../../constants';

const Container = styled.div`\n  display: flex;\n  justify-content: center;
  align-items: center;
  height: 100vh; /* occupy 100% of the viewport height */
  width: 100%; /* occupy 100% of the viewport width */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 500px;
  width: 300px;
  border: 2px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f6f6f6;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  width: 80%;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #444;
  }
`;
const Link = styled.a`
  margin: 10px;
  padding: 10px;
  width: 80%;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #444;
  };
  text-decoration: none;

`;
const Auth = (props: any) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      login,
      password,
    };
    axios
      .post(`${API_HTTP}/login`, data)
      .then((response) => {
        localStorage.setItem('isAuth', 'true');
        props.setIsAuth(true);
        navigate('/');
        return response.data;
      })
      .catch((error: AxiosError) => {
        const message = (error.response?.data as any).message;
        alert(message);
      });
    console.log('logging in user');
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <InputContainer>
          <Label htmlFor="login">Логин:</Label>
          <Input
            type="login"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </InputContainer>

        <InputContainer>
          <Label htmlFor="password">Пароль:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>

        <Button type="submit">Войти</Button>
        <Link href="/">На главную</Link>
      </Form>
      
    </Container>
  );
};

export default Auth;
