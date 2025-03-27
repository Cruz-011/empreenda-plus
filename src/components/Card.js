import styled from 'styled-components';

const CardBox = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  width: 100%;
  height: 120px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin: 0;
`;

const Subtitle = styled.p`
  margin-top: 0.25rem;
  font-weight: 600;
`;

const Card = ({ title, value }) => (
  <CardBox>
    <Title>{value}</Title>
    <Subtitle>{title}</Subtitle>
  </CardBox>
);

export default Card;
