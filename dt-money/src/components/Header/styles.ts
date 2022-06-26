import styled from 'styled-components';

export const Container = styled.header`
  background: var(--purple);
`;

export const Content = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 0 auto;
  max-width: 1120px;
  padding: 2rem 1rem 12rem;

  button {
    background: var(--purple-light);
    border: 0;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1rem;
    height: 3rem;
    padding: 0 2rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;