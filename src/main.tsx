import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ContextProvider } from './hooks/useContextProvider.tsx'
import './reset.css'

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)
