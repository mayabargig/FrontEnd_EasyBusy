import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UserProvider from './context/User.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Disable React DevTools in production
if (process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>

      <div className='dark:text-white dark:bg-black'>
        <App />
      </div>
   
  </UserProvider>
);