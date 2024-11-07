import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid var(--neon-color);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px var(--neon-color);
    transform: scale(1.05);
  }
`;

export const CategoryCard = styled.div`
  background-color: var(--accent-color);
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1rem;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;