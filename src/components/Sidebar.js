// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const SidebarContainer = styled.aside`
  width: ${({ isOpen }) => (isOpen ? '220px' : '70px')};
  min-height: 100vh;
  background: #2f4f5f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: 0.3s ease;
  position: fixed;
  z-index: 10;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.3s;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  transition: 0.3s ease;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: #3d6c7a;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.2);
  margin: 1.5rem 0;
`;

const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: 0.2s;
`;

const UserName = styled.div`
  font-size: 1.05rem;
  font-weight: 500;
`;

const AccountButton = styled.button`
  background: #3d6c7a;
  color: white;
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;

  &:hover {
    background: #4e8597;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userName = "João Silva";

  const trocarConta = () => {
    alert("Função de trocar conta em breve.");
  };

  const sair = () => {
    alert("Você saiu da conta!");
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </ToggleButton>

      <Logo isOpen={isOpen}>📦 Empreenda+</Logo>

      <Nav>
        <StyledLink to="/">🏠 {isOpen && 'Dashboard'}</StyledLink>
        <StyledLink to="/estoque">📦 {isOpen && 'Estoque'}</StyledLink>
        <StyledLink to="/vendas">💰 {isOpen && 'Vendas'}</StyledLink>
      </Nav>

      <Divider />

      <AccountSection isOpen={isOpen}>
        <UserName>👤 {userName}</UserName>
        <AccountButton onClick={trocarConta}>Trocar Conta</AccountButton>
        <AccountButton onClick={sair}>Sair</AccountButton>
      </AccountSection>
    </SidebarContainer>
  );
};

export default Sidebar;
