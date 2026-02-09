import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './pages/context/AuthContext.jsx'
import { ThemeContextProvider } from './pages/context/ThemeContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </Provider>
  //</StrictMode>,
)
