// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Estoque from './pages/Estoque';
import Vendas from './pages/Vendas';
import styled from 'styled-components';

const Content = styled.div`
  margin-left: 240px; // mesmo valor da largura da Sidebar
  padding: 2rem;
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
