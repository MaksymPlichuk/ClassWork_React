import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './pages/context/AuthContext.jsx'
import { ThemeContext } from '@emotion/react'
import { ThemeContextProvider } from './pages/context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
