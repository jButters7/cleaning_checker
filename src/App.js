import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';

import './App.css';
// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Nav random={routes} />
      {routes}
    </div>
  );
}

export default App;
