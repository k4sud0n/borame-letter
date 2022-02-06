import React from 'react';

import { Route, Switch } from 'wouter';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AchievementsPage from './pages/AchievementsPage';
import RecruitPage from './pages/RecruitPage';
import RecruitDetailPage from './pages/RecruitDetailPage';

function App() {
  return (
    <div className={'flex flex-col w-full h-full'}>
    <Header />
      <Switch>
        <Route path={'/'} component={MainPage} />
        <Route path={'/about'} component={AboutPage} />
        <Route path={'/achievements'} component={AchievementsPage} />
        <Route path={'/recruit'} component={RecruitPage} />
        <Route path={'/recruit/details:rest*'} component={RecruitDetailPage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>

  );
}

export default App;