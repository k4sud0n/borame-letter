import Banner from '@/components/main/Banner';
import Endpoints from '@/constants/endpoints';
import Main from '@/types/Main';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';

const MainPage = (): JSX.Element => {
  const { data } = useSWR<Main>(Endpoints.MAIN);

  const newsList = useMemo(() => {
    if (data?.letters) {
      return Object.values(data.letters)
        .map((value) => ({
          title: value.match(/^<([^>]+)>/)?.[1],
          content: value.split(/^(<[^>]+>)/)[2].split('/'),
        }));
    }

    return null;
  }, [data]);

  return (
    <div className={'flex flex-col grow gap-8'}>
      <Banner />
      <div className={'container md:mx-auto flex flex-col justify-center items-center'}>
        <div className={'font-semibold text-2xl'}>
          현재 보라매 인편을 사용중인 사람수
        </div>
        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <div className={'font-bold text-6xl drop-shadow-2xl'}>
              {isVisible && data?.total_users && (
                <CountUp
                  useEasing
                  start={0}
                  end={data.total_users}
                  duration={3}
                  suffix={'명'}
                />
              )}
              {!isVisible && (data?.total_users ?? 0)}
            </div>
          )}
        </VisibilitySensor>
      </div>
      <div className={'w-full flex flex-row justify-start items-stretch gap-6 overflow-x-auto p-6 md:p-0 pretty-scroll'}>
        {newsList?.map(({ title, content }, index) => (
          <div
            key={title}
            className={`
              flex flex-col justify-start items-stretch gap-2 min-w-fit
              ${
                index === 0 ? 'md:ml-24' :
                index === newsList.length - 1 ? 'md:mr-24'
                : ''
              }`}>
            <div className={'font-bold text-2xl drop-shadow-xl'}>{title}</div>
            <div className={'bg-slate-100 rounded-xl shadow-xl p-3 flex flex-col gap-1 grow'}>
              {content.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
