import React from 'react';
import './App.css';
import Router from './routers';
import { ToastContainer } from 'react-toastify';
const App:React.FC = () => {
  
  return (
      <div className="App">
        <ToastContainer autoClose={3000} />
       <Router />
      </div>
  );
}

export default App;
