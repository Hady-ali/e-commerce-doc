import React from 'react'
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import "flowbite";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './redux/Store.jsx';
import LoadingScreen from './components/pages/LoadingScreen.jsx';




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadingScreen />
      <App />
    </Provider>
  </React.StrictMode>,
)
