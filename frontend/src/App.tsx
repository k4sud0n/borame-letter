import React from 'react';

import { Route, Switch } from 'wouter';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Switch>
      <Route path={'/'} component={MainPage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;