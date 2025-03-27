import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 250px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.75rem;
  text-align: center;
  border-top: 1px solid #eee;
`;

const Row = styled.tr`
  background: ${({ isLow }) => (isLow ? '#ffe5e5' : 'white')};
  &:hover {
    background: #f4f4f4;
  }
`;

const Button = styled.button`
  margin: 0.25rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  background: ${({ typeBtn }) => typeBtn === 'edit' ? '#007bff' : '#dc3545'};

  &:hover {
    opacity: 0.85;
  }
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Estoque = () => {
  const [filtro, setFiltro] = useState('');
  const [produtos, setProdutos] = useState([
    { nome: "Água de coco", qtd: 3320, custo: 8.75, venda: 22.5, perc: "157%", att: 200 },
    { nome: "Melancia", qtd: 500, custo: 8.75, venda: 22.5, perc: "157%", att: -200 },
    { nome: "Maçã verde", qtd: 100, custo: 8.75, venda: 22.5, perc: "157%", att: -200 },
    { nome: "Maracujá", qtd: 3320, custo: 8.75, venda: 22.5, perc: "157%", att: 200 },
    { nome: "Morango", qtd: 200, custo: 8.75, venda: 22.5, perc: "157%", att: 200 },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = (index) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirm) {
      const novo = [...produtos];
      novo.splice(index, 1);
      setProdutos(novo);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(produtos[index]);
  };

  const handleSave = () => {
    const atualizado = [...produtos];
    atualizado[editIndex] = editData;
    setProdutos(atualizado);
    setEditIndex(null);
  };

  const produtosFiltrados = produtos.filter(({ nome }) =>
    nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalEstoque = produtosFiltrados.reduce((acc, { qtd }) => acc + qtd, 0);

  return (
    <Container>
      <Header>
        <Title>📦 Controle de Estoque</Title>
        <Input
          placeholder="🔍 Buscar produto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Produto</Th>
            <Th>Quantidade</Th>
            <Th>Custo</Th>
            <Th>Venda</Th>
            <Th>Margem</Th>
            <Th>Atualização</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map((p, i) => (
            <Row key={p.nome} isLow={p.qtd < 300}>
              <Td>{p.nome}</Td>
              <Td>{p.qtd}</Td>
              <Td>R$ {p.custo.toFixed(2)}</Td>
              <Td>R$ {p.venda.toFixed(2)}</Td>
              <Td>{p.perc}</Td>
              <Td style={{ color: p.att >= 0 ? 'green' : 'red' }}>
                {p.att >= 0 ? `+${p.att}` : p.att}
              </Td>
              <Td>
                <Button typeBtn="edit" onClick={() => handleEdit(i)}>Editar</Button>
                <Button typeBtn="delete" onClick={() => handleDelete(i)}>Excluir</Button>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>

      <p style={{ marginTop: '1rem', fontWeight: 600 }}>
        Total no estoque : <strong>{totalEstoque.toLocaleString()}</strong> unidades
      </p>

      {editIndex !== null && (
        <Modal>
          <h3>✏️ Editar Produto</h3>
          <Input
            value={editData.nome}
            onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
            placeholder="Nome"
          />
          <Input
            type="number"
            value={editData.qtd}
            onChange={(e) => setEditData({ ...editData, qtd: Number(e.target.value) })}
            placeholder="Quantidade"
          />
          <Input
            type="number"
            value={editData.custo}
            onChange={(e) => setEditData({ ...editData, custo: Number(e.target.value) })}
            placeholder="Custo"
          />
          <Input
            type="number"
            value={editData.venda}
            onChange={(e) => setEditData({ ...editData, venda: Number(e.target.value) })}
            placeholder="Venda"
          />
          <Button typeBtn="edit" onClick={handleSave}>Salvar</Button>
          <Button typeBtn="delete" onClick={() => setEditIndex(null)}>Cancelar</Button>
        </Modal>
      )}
    </Container>
  );
};

export default Estoque;
