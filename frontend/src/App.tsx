import React, { Suspense } from 'react';

import { Route, Switch, useLocation } from 'wouter';
import { CSSTransition, SwitchTransition, Transition, TransitionGroup } from 'react-transition-group';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/NoticePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ReviewPage from './pages/ReviewPage';
import RecruitPage from './pages/RecruitPage';
import RecruitDetailPage from './pages/RecruitDetailPage';
import NoticePostPage from './pages/NoticePostPage';
import Spinner from './components/common/Spinner';
import useSWR, { SWRConfig } from 'swr';
import ReviewPostPage from './pages/ReviewPostPage';
import Endpoints from './constants/endpoints';

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
                <Route path={'/notice'} component={AboutPage} />
                <Route path={'/notice/:id'}>
                  {({ id }) => (<NoticePostPage id={id} />)}
                </Route>
                <Route path={'/review'} component={ReviewPage} />
                <Route path={'/review/:id'}>
                  {({ id }) => (<ReviewPostPage id={id} />)}
                </Route>
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