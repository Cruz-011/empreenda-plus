import React, { useState, useEffect } from 'react';
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
  const [produtos, setProdutos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar produtos');
        return res.json();
      })
      .then(data => {
        const produtosTratados = data.map(p => ({
          id: p.id,
          nome: p.nome,
          qtd: p.quantidade,
          custo: p.preco,
          venda: p.preco * 2.57,
          perc: "157%",
          att: 200
        }));
        setProdutos(produtosTratados);
      })
      .catch(err => {
        alert('Erro ao carregar produtos: ' + err.message);
      });
  }, []);

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return;

    const produto = produtos[index];

    fetch(`http://localhost:8080/products/${produto.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao deletar');
        const novo = [...produtos];
        novo.splice(index, 1);
        setProdutos(novo);
        alert("Produto deletado com sucesso!");
      })
      .catch(err => {
        alert("Erro ao deletar produto: " + err.message);
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(produtos[index]);
  };

  const handleSave = () => {
    const method = editData.id ? 'PUT' : 'POST';
    const url = editData.id
      ? `http://localhost:8080/products/${editData.id}`
      : 'http://localhost:8080/products';

    const body = {
      nome: editData.nome,
      preco: editData.custo,
      quantidade: editData.qtd
    };

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then(saved => {
        alert("Produto salvo com sucesso!");

        const atualizado = [...produtos];

        const produtoFormatado = {
          id: saved.id,
          nome: saved.nome,
          custo: saved.preco,
          qtd: saved.quantidade,
          venda: saved.preco * 2.57,
          perc: "157%",
          att: 200
        };

        if (editData.id) {
          atualizado[editIndex] = produtoFormatado;
        } else {
          atualizado.push(produtoFormatado);
        }

        setProdutos(atualizado);
        setEditIndex(null);
      })
      .catch(err => {
        alert("Erro ao salvar produto: " + err.message);
      });
  };

  const produtosFiltrados = produtos.filter(({ nome }) =>
    nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalEstoque = produtosFiltrados.reduce((acc, { qtd }) => acc + (qtd || 0), 0);

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

      <Button typeBtn="edit" onClick={() => {
        fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: "Produto Exemplo",
            descricao: "Gerado automaticamente",
            preco: 12.5,
            quantidade: 500
          })
        })
          .then(res => {
            if (!res.ok) throw new Error('Erro ao adicionar');
            return res.json();
          })
          .then(prod => {
            alert("Produto adicionado!");
            setProdutos(prev => [
              ...prev,
              {
                id: prod.id,
                nome: prod.nome,
                qtd: prod.quantidade,
                custo: prod.preco,
                venda: prod.preco * 2.57,
                perc: "157%",
                att: 200
              }
            ]);
          })
          .catch(err => alert("Erro: " + err.message));
      }}>
        Adicionar Produto Exemplo
      </Button>

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
            <Row key={p.id} isLow={p.qtd < 300}>
              <Td>{p.nome}</Td>
              <Td>{p.qtd}</Td>
              <Td>R$ {p.custo?.toFixed(2) ?? '0,00'}</Td>
              <Td>R$ {p.venda?.toFixed(2) ?? '0,00'}</Td>
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