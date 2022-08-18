// Criação de uma mensagem de erro de quando o erro for devido ao token
export class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token.');
  };
};
