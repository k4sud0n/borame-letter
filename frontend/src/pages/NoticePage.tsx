import NoticeCard from '@/components/notice/NoticeCard';
import Spinner from '@/components/common/Spinner';
import React, { useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import Endpoints from '@/constants/endpoints';
import ErrorViewer from '@/components/ErrorViewer';
import NoticeResponse from '@/types/NoticeResponse';
import VisibilitySensor from 'react-visibility-sensor';
import backgroundImage from '../../../assets/image/background1.png';

const getKey: SWRInfiniteKeyLoader = (index, previousData) => {
  if (previousData && previousData.total < previousData.size * previousData.page) return null;

  return `${Endpoints.NOTICE_LIST}?page=${index + 1}&size=10`;
}

const NoticePage = (): JSX.Element => {
  const { data, error, setSize } = useSWRInfinite<NoticeResponse>(getKey);

  const loadNextPage = useCallback((isVisible) => {
    if(isVisible) {
      setSize((it) => it + 1);
    }
  }, []);

  const items = useMemo(() => data?.map((it) => it.items)?.flat(), [data]);
  const isMore = useMemo(() => {
    if (data) {
      const lastResponse = data[data.length - 1];

      return lastResponse.total > lastResponse.size * lastResponse.page;
    }

    return true;
  }, [data]);

  return (
    <div className={'relative grow'}>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'md:container md:mx-auto p-3 flex flex-col gap-3 overflow-y-auto'}>
          {items?.map((post) => (
            <NoticeCard
              key={post.id}
              id={post.id}
              title={post.title}
              summary={post.content.slice(0, 50)}
              date={new Date(post.created_at)}
              writer={post.writer}
              thumbnail={backgroundImage}
            />
          ))}
          {isMore && (
            <VisibilitySensor partialVisibility onChange={loadNextPage}>
              <div className={'self-center border-sky-500 mt-3'}>
               <Spinner />
             </div>
            </VisibilitySensor>
          )}
        </div>
      </CSSTransition>
      <CSSTransition in={!data && !error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'absolute inset-0 border-sky-500 flex flex-col justify-center items-center'}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
      <CSSTransition in={!!error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'absolute inset-0 flex flex-col justify-center items-center'}>
          <ErrorViewer error={error} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default NoticePage;
