import React, { Suspense } from 'react';

import { Route, Switch, useLocation } from 'wouter';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { SWRConfig } from 'swr';

import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/NoticePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ReviewPage from './pages/ReviewPage';
import RecruitPage from './pages/RecruitPage';
import RecruitDetailPage from './pages/RecruitDetailPage';
import NoticePostPage from './pages/NoticePostPage';
import ReviewPostPage from './pages/ReviewPostPage';
import ReviewUploadPage from './pages/ReviewUploadPage';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function App() {
  const [location] = useLocation();

  return (
    <SWRConfig value={{ fetcher }}>
      <div className={'flex flex-col w-full h-full'}>
        <Header />
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
              <Route path={'/upload/review'} component={ReviewUploadPage} />
              <Route component={ErrorPage} />
            </Switch>
          </CSSTransition>
        </SwitchTransition>
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default App;