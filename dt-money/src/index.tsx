import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App'

createServer({
	models: {
		transaction: Model,
	},
	seeds(server) {
		server.db.loadData({
			transactions:[
				{
					id: 1,
					title: 'Freelance de website',
					transactionType: 'deposit',
					category: 'Dev',
					amount: 6000,
					createdAt: new Date('2021-02-17 09:00:00'),
				},
				{
					id: 2,
					title: 'Aluguel',
					transactionType: 'withdraw',
					category: 'Casa',
					amount: 1100,
					createdAt: new Date('2021-02-17 09:00:00'),
				},
			]
		})
	},
	routes() {
		this.namespace = 'api';
		this.get('/transactions', () => {
			//Rota criada para HTTP requests do tipo get, para a rota transactions
			return this.schema.all('transaction');
		});
		this.post('/transactions', (schema, request) => {
			//Rota cruada para HTTP requests do tipo post, para a rota transactions
			const data = JSON.parse(request.requestBody);
			return schema.create('transaction', data);
		});
	}
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
