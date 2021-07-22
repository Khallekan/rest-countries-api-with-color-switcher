import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import CountryList from './CountryList';
import SingleCountry from '../components/SingleCountry';
import { useGlobalContext } from '../context';
const App = () => {
  const { darkMode } = useGlobalContext();
  return (
    <div className={`grid h-full app-wrapper ${darkMode ? `dark` : ``}`}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <CountryList />
          </Route>
          <Route exact path='/:name'>
            <SingleCountry />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
