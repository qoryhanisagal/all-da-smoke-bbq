import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App'; 
import './index.css';

// Initialize theme before rendering
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('ads-theme') || 'black';
  document.documentElement.setAttribute('data-theme', storedTheme);
};

initializeTheme();

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);