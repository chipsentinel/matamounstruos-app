// import BASE de React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// estilos globale externos
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// SweetAlert2 se importara solo en los componentes donde se use
// import Swal from 'sweetalert2';