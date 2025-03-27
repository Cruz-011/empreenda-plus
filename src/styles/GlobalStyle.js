import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
