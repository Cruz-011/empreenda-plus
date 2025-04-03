import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Estoque from './pages/Estoque';
import Vendas from './pages/Vendas';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PrivateRoute from './components/PrivateRoute';
import styled from 'styled-components';
import { useState } from 'react';

const Content = styled.div`
  margin-left: 70px;
  padding: 2rem;
  transition: 0.3s ease;

  @media (min-width: 768px) {
    margin-left: 220px;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));

  return (
    <Router>
      <GlobalStyle />
      {isLoggedIn && <Sidebar onLogout={() => setIsLoggedIn(false)} />}
      <Content>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/cadastro" element={<Cadastro onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/estoque" element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          } />
          <Route path="/vendas" element={
            <PrivateRoute>
              <Vendas />
            </PrivateRoute>
          } />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;