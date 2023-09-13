import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let appReady = Promise.resolve()

// Enable API mocking only in development
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  appReady = worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}

appReady.then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
})
