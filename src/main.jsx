import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/User.jsx'
// import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <UserProvider>
            <div className=' dark:text-white dark:bg-black'>
            <App />
            </div>
        </UserProvider>
    // </React.StrictMode>,
)

