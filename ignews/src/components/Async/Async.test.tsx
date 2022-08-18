import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
  render(<Async />);

  expect(screen.getByText('Hello World')).toBeInTheDocument();
   //expect(await screen.findByText('Button')).toBeInTheDocument(); Podemos utilizar o findByText, porque ele espera um pouco a renderização
  await waitFor(() => { // Espera algo acontecer, e quando isso acontece passa o teste
    return expect(screen.getByText('Button')).toBeInTheDocument();
  })
});
