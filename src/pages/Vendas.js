import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
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
  background: white;
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

const Status = styled.span`
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  color: white;
  background: ${({ status }) =>
    status === 'Confirmado' ? '#28a745' :
    status === 'Pendente' ? '#ffc107' :
    '#dc3545'};
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

const Vendas = () => {
  const [vendas, setVendas] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroForma, setFiltroForma] = useState('');
  const [filtroID, setFiltroID] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/sales')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar vendas');
        return res.json();
      })
      .then(data => setVendas(data))
      .catch(err => alert('Erro: ' + err.message));
  }, []);

  const criarVendaExemplo = () => {
    const nova = {
      cliente: "Cliente Teste",
      quantidade: 3,
      valorTotal: 99.9,
      formaPagamento: "Pix",
      status: "Confirmado"
    };

    fetch('http://localhost:8080/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cadastrar venda');
        return res.json();
      })
      .then(venda => {
        alert("Venda exemplo cadastrada!");
        const formatada = {
          ...venda,
          qtd: venda.quantidade,
          valor: venda.valorTotal,
          forma: venda.formaPagamento
        };
        setVendas(prev => [...prev, formatada]);
      })
      .catch(err => alert('Erro: ' + err.message));
  };

  const handleDelete = (index) => {
    const venda = vendas[index];
    if (!window.confirm("Excluir venda?")) return;

    fetch(`http://localhost:8080/sales/${venda.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao excluir');
        const novaLista = [...vendas];
        novaLista.splice(index, 1);
        setVendas(novaLista);
        alert("Venda excluída com sucesso!");
      })
      .catch(err => alert("Erro: " + err.message));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(vendas[index]);
  };

  const handleSave = () => {
    const method = editData.id ? 'PUT' : 'POST';
    const url = editData.id
      ? `http://localhost:8080/sales/${editData.id}`
      : 'http://localhost:8080/sales';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente: editData.cliente,
        quantidade: editData.qtd,
        valorTotal: editData.valor,
        formaPagamento: editData.forma,
        status: editData.status
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then(saved => {
        alert("Venda salva com sucesso!");
        const atualizadas = [...vendas];

        const novaVenda = {
          ...saved,
          qtd: saved.quantidade,
          valor: saved.valorTotal,
          forma: saved.formaPagamento
        };

        if (editData.id) {
          atualizadas[editIndex] = novaVenda;
        } else {
          atualizadas.push(novaVenda);
        }

        setVendas(atualizadas);
        setEditIndex(null);
      })
      .catch(err => alert("Erro: " + err.message));
  };

  const vendasFiltradas = vendas.filter(v =>
    v.cliente.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (filtroStatus ? v.status === filtroStatus : true) &&
    (filtroForma ? v.forma === filtroForma : true) &&
    (filtroID ? v.id.toString().includes(filtroID) : true)
  );

  const totalValor = vendasFiltradas.reduce((acc, venda) => acc + venda.valor, 0);

  return (
    <Container>
      <Header>
        <Title>🧾 Vendas Registradas</Title>
        <Filters>
          <Input placeholder="🔍 Cliente" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
          <Input placeholder="ID Cliente" value={filtroID} onChange={(e) => setFiltroID(e.target.value)} />
          <Select value={filtroForma} onChange={(e) => setFiltroForma(e.target.value)}>
            <option value="">Todos</option>
            <option value="Pix">Pix</option>
            <option value="Cartão">Cartão</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Boleto">Boleto</option>
          </Select>
          <Select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </Select>
        </Filters>
      </Header>

      <Button typeBtn="edit" onClick={criarVendaExemplo}>Criar Venda Exemplo</Button>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Cliente</Th>
            <Th>Qtd</Th>
            <Th>Valor</Th>
            <Th>Forma</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {vendasFiltradas.map((venda, i) => (
            <Row key={venda.id}>
              <Td>{venda.id}</Td>
              <Td>{venda.cliente}</Td>
              <Td>{venda.qtd}</Td>
              <Td>R$ {venda.valor?.toFixed(2) ?? '0,00'}</Td>
              <Td>{venda.forma}</Td>
              <Td><Status status={venda.status}>{venda.status}</Status></Td>
              <Td>
                <Button typeBtn="edit" onClick={() => handleEdit(i)}>Editar</Button>
                <Button typeBtn="delete" onClick={() => handleDelete(i)}>Excluir</Button>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>

      <p style={{ marginTop: '1rem', fontWeight: 600 }}>
        Total de vendas : <strong>{vendasFiltradas.length}</strong> | Valor total: <strong>R$ {totalValor.toFixed(2)}</strong>
      </p>

      {editIndex !== null && (
        <Modal>
          <h3>✏️ Editar Venda</h3>
          <Input
            value={editData.cliente}
            onChange={(e) => setEditData({ ...editData, cliente: e.target.value })}
            placeholder="Cliente"
          />
          <Input
            type="number"
            value={editData.qtd}
            onChange={(e) => setEditData({ ...editData, qtd: Number(e.target.value) })}
            placeholder="Quantidade"
          />
          <Input
            type="number"
            value={editData.valor}
            onChange={(e) => setEditData({ ...editData, valor: Number(e.target.value) })}
            placeholder="Valor"
          />
          <Select
            value={editData.forma}
            onChange={(e) => setEditData({ ...editData, forma: e.target.value })}
          >
            <option value="">Forma de Pagamento</option>
            <option value="Pix">Pix</option>
            <option value="Cartão">Cartão</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Boleto">Boleto</option>
          </Select>
          <Select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </Select>
          <Button typeBtn="edit" onClick={handleSave}>Salvar</Button>
          <Button typeBtn="delete" onClick={() => setEditIndex(null)}>Cancelar</Button>
        </Modal>
      )}
    </Container>
  );
};

export default Vendas;