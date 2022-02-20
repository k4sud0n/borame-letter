import Spinner from '@/components/common/Spinner';
import NoticePost from '@/types/NoticePost';
import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const localeOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export interface NoticePostPageProps {
  id: string;
}

const NotivePostPage = ({ id }: NoticePostPageProps): JSX.Element => {
  const [data, setData] = useState<NoticePost | null>(null);

  const fetchData = useCallback(async () => {
    setData(null);
    try {
      const response = await fetch(`https://local.sihyun.codes/notice/${id}`);
      const [data] = await response.json();

      console.log(data);
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <div className={'absolute right-3 top-3 text-slate-500 text-xs text-right'}>
              {'업로드 일자: '}
              {data?.created_at ? new Date(data.created_at)?.toLocaleString(undefined, localeOptions) : '알 수 없음'}
              <br />
              {data?.writer}
            </div>
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
