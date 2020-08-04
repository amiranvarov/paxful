import React from 'react';
import { Navbar as TopNavigationBar } from 'components/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Navigation';
import { Provider } from "react-redux";

import { RateObserver } from 'components/rateObserver'
import './App.css'

import { configureStore } from './state/configureStore';

function App() {
  return (
      <Provider store={configureStore()}>
          <Router>
              <RateObserver />
              <TopNavigationBar />
              <Routes/>
          </Router>
      </Provider>
  );
}

export default App;
