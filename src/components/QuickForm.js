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
`;

const QuickForm = () => {
  const [produto, setProduto] = useState({ nome: '', qtd: '', custo: '', venda: '' });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(`Produto "${produto.nome}" cadastrado!`);
    setProduto({ nome: '', qtd: '', custo: '', venda: '' });
  };

  return (
    <FormContainer>
      <h3>📥 Adicionar Produto Rápido</h3>
      <Row>
        <Input name="nome" placeholder="Nome do produto" value={produto.nome} onChange={handleChange} />
        <Input name="qtd" placeholder="Quantidade" value={produto.qtd} onChange={handleChange} />
        <Input name="custo" placeholder="Custo" value={produto.custo} onChange={handleChange} />
        <Input name="venda" placeholder="Venda" value={produto.venda} onChange={handleChange} />
      </Row>
      <Button onClick={handleSubmit}>Adicionar</Button>
    </FormContainer>
  );
};

export default QuickForm;
