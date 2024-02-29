import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/User.jsx'
import './App.css'
import { ThemeProvider } from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
    <UserProvider>
        <App />
    </UserProvider>
    </ThemeProvider>
)
