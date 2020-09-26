import React from 'react';
import Nav from './Components/Nav';
import AdminDashboard from './Components/AdminDashboard';
import Apartment from './Components/Apartment';
import Archive from './Components/Archive';
import CurrentCheck from './Components/CurrentCheck';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import TenantList from './Components/TenantList';

import './App.css';
// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Nav />
      <AdminDashboard />
      <Apartment />
      <Archive />
      <CurrentCheck />
      <Dashboard />
      <Login />
      <Register />
      <TenantList />

    </div>
  );
}

export default App;
