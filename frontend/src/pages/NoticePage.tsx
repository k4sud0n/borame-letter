import NoticeCard from '@/components/notice/NoticeCard';
import Spinner from '@/components/common/Spinner';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';
import Endpoints from '@/constants/endpoints';
import ErrorViewer from '@/components/ErrorViewer';
import NoticeResponse from '@/types/NoticeResponse';

const NoticePage = (): JSX.Element => {
  const { data, error } = useSWR<NoticeResponse>(Endpoints.NOTICE_LIST);

  return (
    <div className={'grow relative'}>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'absolute inset-0 grow md:container md:mx-auto p-3 flex flex-col gap-3'}>
          {
              data?.items?.map((post) => (
                <NoticeCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  summary={post.content.slice(0, 50)}
                  date={new Date(post.created_at)}
                  writer={post.writer}
                />
              ))
          }
        </div>
      </CSSTransition>
      <CSSTransition in={!data && !error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center'}>
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
