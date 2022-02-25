import Spinner from '@/components/common/Spinner';
import Star from '@/components/review/Star';
import Endpoints from '@/constants/endpoints';
import Review from '@/types/Review';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';

const localeOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export interface ReviewPostPageProps {
  id: string;
}

const ReviewPostPage = ({ id }: ReviewPostPageProps): JSX.Element => {
  const { data, error } = useSWR<Review>(Endpoints.REVIEW(id));

  return (
    <div className={'grow relative'}>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={''}>
          <div
            className={`
              w-full h-72 bg-slate-500 bg-opacity-50 p-6 flex flex-col gap-3 justify-end md:justify-center items-start md:items-center
              text-4xl font-bold whitespace-pre md:whitespace-normal relative overflow-hidden
            `}
          >
            <img className={'absolute w-full h-full inset-0 -z-10 object-cover blur-sm'} src={'../../../assets/image/background3.jpg'} />
            <div className={'absolute right-3 top-3 text-slate-500 text-xs text-right'}>
              {`업로드 일자: ${data?.created_at ? new Date(data.created_at).toLocaleString(undefined, localeOptions) : '알 수 없음'}`}
            </div>
            <div className={'w-full md:w-fit whitespace-pre-wrap'}>
              {data?.title}
            </div>
            <Star size={36} rating={data?.rating ?? 5} />
            <div className={'text-xl'}>
              {data?.writer}
            </div>
          </div>
          <div className={'w-full grow bg-white p-6 text-md md:px-72 whitespace-pre-wrap'}>
            {data?.content}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={!data && !error} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center'}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
      <CSSTransition in={!!error} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center'}>
          오류가 발생했습니다
          <br />
          {error}
        </div>
      </CSSTransition>
    </div>
  );
}

export default ReviewPostPage;
