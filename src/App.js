// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Estoque from './pages/Estoque';
import Vendas from './pages/Vendas';
import styled from 'styled-components';

const Content = styled.div`
  margin-left: 70px;
  padding: 2rem;
  transition: 0.3s ease;

  @media (min-width: 768px) {
    margin-left: 220px;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/vendas" element={<Vendas />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
