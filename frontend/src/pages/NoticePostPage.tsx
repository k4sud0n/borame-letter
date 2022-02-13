import Spinner from '@/components/common/Spinner';
import NoticePost from '@/types/NoticePost';
import React, { useLayoutEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface NoticePostPageProps {
  id: string;
}

const NotivePostPage = ({ id }: NoticePostPageProps): JSX.Element => {
  const [data, setData] = useState<NoticePost | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      setData({
        title: '보라매 인편\n곧 오픈합니다',
        content: '마니마니 써주세요',
        date: new Date(),
      });
    }, 1500);
  }, []);

  return (
    <div className={'grow relative'}>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter>
        <div className={'absolute inset-0'}>
          <div
            className={`
              w-full h-72 bg-slate-500 bg-opacity-30 p-6 flex justify-start md:justify-center items-end md:items-center
              text-4xl font-bold whitespace-pre md:whitespace-normal relative overflow-hidden
            `}
          >
            <img className={'absolute w-full h-full -z-10 object-contain'} src={data?.thumbnail ?? '../../../assets/image/background1.png'} />
            <div className={'absolute right-3 top-3 text-slate-500 text-xs'}>{data?.date?.toLocaleString()}</div>
            {data?.title}
          </div>
          <div className={'w-full grow bg-white p-6 text-md md:px-72'}>
            {data?.content}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={!data} timeout={250} classNames={'fade-scale'} unmountOnExit>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center '}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default NotivePostPage;
