import React, { Component } from 'react';

import './App.css';
import Header from './components/header';
import ProfileView from './components/profileView';
import "./components/profileView.css";
function App() {
  return (
    <React.Fragment>
      <Header />
      <ProfileView />
    </React.Fragment>
    
    
  );
}

export default App;
