import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Box = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Small = styled.small`
  text-align: center;
  display: block;
`;

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
      .then(res => {
        if (!res.ok) throw new Error("Credenciais inválidas");
        return res.json();
      })
      .then(user => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.nome);
        if (onLogin) onLogin(); // <- chama a função passada pelo App.js
        navigate('/dashboard');
      })
      .catch(err => alert("Erro: " + err.message));
  };

  return (
    <Container>
      <Box as="form" onSubmit={handleLogin}>
        <Title>🔐 Login</Title>
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
        <Small>
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </Small>
      </Box>
    </Container>
  );
};

export default Login;