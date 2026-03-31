import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import AuthProvider from './features/auth/AuthProvider.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path='/*' element={<App/>}/>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
    </Provider>
  </StrictMode>,
)
