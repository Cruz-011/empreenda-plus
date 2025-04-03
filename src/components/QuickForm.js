import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;

const QuickForm = () => {
  const [produto, setProduto] = useState({
    nome: '',
    qtd: '',
    custo: '',
    venda: ''
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!produto.nome || !produto.qtd || !produto.custo) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      nome: produto.nome,
      quantidade: parseInt(produto.qtd),
      preco: parseFloat(produto.custo),
      descricao: ''
    };

    fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cadastrar');
        return res.json();
      })
      .then(() => {
        alert(`Produto "${produto.nome}" cadastrado com sucesso!`);
        setProduto({ nome: '', qtd: '', custo: '', venda: '' });
      })
      .catch(err => {
        alert('Erro ao cadastrar produto: ' + err.message);
      });
  };

  return (
    <FormContainer>
      <h3>📥 Adicionar Produto Rápido</h3>
      <Row>
        <Input name="nome" placeholder="Nome do produto" value={produto.nome} onChange={handleChange} />
        <Input name="qtd" placeholder="Quantidade" value={produto.qtd} onChange={handleChange} />
        <Input name="custo" placeholder="Preço de custo" value={produto.custo} onChange={handleChange} />
        <Input name="venda" placeholder="Preço de venda (não usado)" value={produto.venda} onChange={handleChange} />
      </Row>
      <Button onClick={handleSubmit}>Cadastrar</Button>
    </FormContainer>
  );
};

export default QuickForm;