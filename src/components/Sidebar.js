import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: #2f4f5f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: fixed;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 6px;
  transition: 0.3s ease;

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
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserName = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const AccountButton = styled.button`
  background: #3d6c7a;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: 0.3s ease;

  &:hover {
    background: #4e8597;
  }
`;

const Sidebar = () => {
  const userName = "João Silva"; 

  const trocarConta = () => {
    alert("Função de trocar conta em desenvolvimento.");
  };

  const sair = () => {
    alert("Você saiu da conta!");
  };

  return (
    <SidebarContainer>
      <Logo>EMPREENDA+ </Logo>

      <Nav>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/estoque">Estoque</StyledLink>
        <StyledLink to="/vendas">Vendas</StyledLink>
      </Nav>

      <Divider />

      <AccountSection>
        <UserName>👤 {userName}</UserName>
        <AccountButton onClick={trocarConta}>Trocar Conta</AccountButton>
        <AccountButton onClick={sair}>Sair</AccountButton>
      </AccountSection>
    </SidebarContainer>
  );
};

export default Sidebar;
