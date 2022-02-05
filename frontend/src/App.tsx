import React from 'react';

import { Route, Switch } from 'wouter';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AchievementsPage from './pages/AchievementsPage';
import RecruitPage from './pages/RecruitPage';

function App() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <Header />
      <Switch>
        <Route path={'/'} component={MainPage} />
        <Route path={'/about'} component={AboutPage} />
        <Route path={'/achievements'} component={AchievementsPage} />
        <Route path={'/recruit'} component={RecruitPage} />
        <Route component={ErrorPage} />
      </Switch>
      <div className={'grow'} />
      <Footer />
    </div>

  );
}

export default App;