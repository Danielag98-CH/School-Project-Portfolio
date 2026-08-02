import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'; // ADD THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the App inside a BrowserRouter component: */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)