import React from 'react'
import ReactDOM from 'react-dom'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-03-15 02:00:00')
        },
        {
          id: 2,
          title: 'Ifood',
          type: 'withdraw',
          category: 'food',
          amount: 30,
          createdAt: new Date('2021-04-08 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'
  
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transaction', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
