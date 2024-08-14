import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import Store from './store.js'
import {positions, transitions , Provider as Alertprovider} from 'react-alert'
import  AlertTemplate  from "react-alert-template-basic"

const options ={

  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={Store}>
      <Alertprovider template={AlertTemplate} {...options}>
    <App />
    </Alertprovider>
    </Provider>
  </React.StrictMode>,
)
