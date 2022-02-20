import React, { Suspense } from 'react';

import { Route, Switch, useLocation } from 'wouter';
import { CSSTransition, SwitchTransition, Transition, TransitionGroup } from 'react-transition-group';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/NoticePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AchievementsPage from './pages/AchievementsPage';
import RecruitPage from './pages/RecruitPage';
import RecruitDetailPage from './pages/RecruitDetailPage';
import NoticePostPage from './pages/NoticePostPage';
import Spinner from './components/common/Spinner';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function App() {
  const [location] = useLocation();

  return (
    <SWRConfig value={{ fetcher }}>
      <div className={'flex flex-col w-full h-full'}>
        <Header />
        <Suspense fallback={<Spinner />}>
          <SwitchTransition>
            <CSSTransition in key={location} classNames={'slide'} timeout={250}>
              <Switch location={location}>
                <Route path={'/'} component={MainPage} />
                <Route path={'/about'} component={AboutPage} />
                <Route path={'/about/:id'}>
                  {({ id }) => (<NoticePostPage id={id} />)}
                </Route>
                <Route path={'/achievements'} component={AchievementsPage} />
                <Route path={'/recruit'} component={RecruitPage} />
                <Route path={'/recruit/details:rest*'} component={RecruitDetailPage} />
                <Route component={ErrorPage} />
              </Switch>
            </CSSTransition>
          </SwitchTransition>
        </Suspense>
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default App;