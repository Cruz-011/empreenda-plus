import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
} from 'chart.js';

import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Container = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const ChartWrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 1rem;
  border-radius: 10px;
  max-height: 300px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  h4 {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const Charts = () => {
  const vendasData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Vendas da Semana',
        data: [250, 400, 320, 500, 600, 450, 700],
        backgroundColor: '#2f4f5f',
        borderRadius: 5,
      },
    ],
  };

  const estoqueData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Total em Estoque',
        data: [28000, 31000, 26000, 32000, 30000, 40700],
        borderColor: '#2f4f5f',
        backgroundColor: '#9dc7d4',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          font: { size: 10 }
        }
      },
      x: {
        ticks: {
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <Container>
      <ChartWrapper style={{ height: '250px' }}>
        <h4>📊 Vendas por Dia da Semana</h4>
        <Bar data={vendasData} options={chartOptions} />
      </ChartWrapper>

      <ChartWrapper style={{ height: '250px' }}>
        <h4>📦 Evolução do Estoque nos Últimos Meses</h4>
        <Line data={estoqueData} options={chartOptions} />
      </ChartWrapper>
    </Container>
  );
};

export default Charts;
