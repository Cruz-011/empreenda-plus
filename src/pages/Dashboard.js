import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Charts from '../components/Charts';
import QuickForm from '../components/QuickForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AlertBox = styled.div`
  background: ${({ theme }) => theme.colors.alert};
  border-left: 6px solid #e2b93b;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const CalendarAndCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

const CalendarBox = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 1rem;
  border-radius: 10px;
  max-width: 350px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
`;

const CardWrapper = styled.div`
  flex: 1;
  min-width: 220px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const data = {
    vendasHoje: 419,
    estoqueAtual: 40700,
    pagos: 500,
    pendentes: 210,
    faturamentoAtual: 'R$ 4.769,47',
    faturamentoMes: 'R$ 67.484,98',
    gastosMensais: 'R$ 12.300,00',
    proximoPagamento: '30/03/2025',
    produtosBaixoEstoque: 6,
    totalProdutos: 128,
  };

  return (
    <Wrapper>
      <SectionTitle>Resumo Geral</SectionTitle>
      <Grid>
        <Card title="Vendas de Hoje" value={data.vendasHoje} />
        <Card title="Estoque Atual" value={data.estoqueAtual} />
        <Card title="Pagamentos Confirmados" value={data.pagos} />
        <Card title="Pagamentos Pendentes" value={data.pendentes} />
        <Card title="Faturamento Atual" value={data.faturamentoAtual} />
        <Card title="Faturamento do Mês" value={data.faturamentoMes} />
      </Grid>

      <SectionTitle>Controle Financeiro e Estoque</SectionTitle>
      <Grid>
        <Card title="Produtos Baixo Estoque" value={data.produtosBaixoEstoque} />
        <Card title="Total de Produtos" value={data.totalProdutos} />
      </Grid>

      <AlertBox>
        ⚠️ Atenção: 6 produtos estão com estoque abaixo do mínimo. Reabastecimento sugerido.
      </AlertBox>

      <SectionTitle>📅 Pagamentos e Agenda</SectionTitle>
      <CalendarAndCard>
        <CalendarBox>
          <Calendar onChange={setDate} value={date} />
        </CalendarBox>
        <CardWrapper>
          <Card title="Gastos Mensais" value={data.gastosMensais} />
        </CardWrapper>
        <CardWrapper>
          <Card title="Próximo Pagamento" value={data.proximoPagamento} />
        </CardWrapper>
      </CalendarAndCard>

      <SectionTitle>📊 Visão Geral</SectionTitle>
      <Charts />

      <QuickForm />
    </Wrapper>
  );
};

export default Dashboard;
