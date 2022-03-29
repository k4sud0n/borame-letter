import Banner from '@/components/main/Banner';
import Endpoints from '@/constants/endpoints';
import Main from '@/types/Main';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
import Pretty from '@/components/main/Pretty';

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
      <div className={'h-12'} />
      <div className={'flex flex-col justify-start items-center gap-3 p-3'}>
        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <div className={'font-bold text-2xl md:text-4xl drop-shadow-2xl leading-relaxed md:leading-relaxed'}>
              {isVisible && (
                <Pretty text={`사회와 단절된 훈련소에서
                매일 뉴스를 받아볼 수 있다면 얼마나 좋을까요?
                바깥소식이 궁금할 수도 있고,
                내가 응원하던 축구팀 소식이 궁금할 수도 있죠.
                아, 물론 주식 가격도요 :)`} />
              )}
              {!isVisible && (
                <Pretty style={{ opacity: 0 }} text={`사회와 단절된 훈련소에서
                매일 뉴스를 받아볼 수 있다면 얼마나 좋을까요?
                바깥소식이 궁금할 수도 있고,
                내가 응원하던 축구팀 소식이 궁금할 수도 있죠.
                아, 물론 주식 가격도요 :)`} />
              )}
            </div>
          )}
        </VisibilitySensor>
        <div className={'h-12'} />
        <VisibilitySensor>
          {({ isVisible }) => (
            <div className={'font-black text-3xl md:text-6xl drop-shadow-xl leading-normal md:leading-normal text-center'}>
              {isVisible && (<div className={'show-in'}>
                보라매인편은<br/>
                입대하는 모든 <span className={'text-sky-500'}>공군 훈련병</span>들에게<br/>
                무료로 인터넷 편지를 보내드립니다.
              </div>)}
              {!isVisible && (<div style={{ opacity: 0}}>
                보라매인편은<br/>
                입대하는 모든 <span className={'text-sky-500'}>공군 훈련병</span>들에게<br/>
                무료로 인터넷 편지를 보내드립니다.
              </div>)}
            </div>
          )}
        </VisibilitySensor>
        <div className={'h-12'} />
      </div>
      <div className={'grid md:grid-cols-3 grid-rows-3 w-full gap-12 p-6 py-12 md:p-12 container md:mx-auto'}>
        {newsList?.map(({ title, content }) => (
          <div
            key={title}
            className={'flex flex-col justify-start gap-2'}
          >
            <div className={'font-bold text-2xl drop-shadow-xl'}>{title}</div>
            <div className={'bg-slate-100 rounded-xl shadow-xl p-3 flex flex-col gap-1 overflow-y-auto grow max-h-96 min-h-[12rem] pretty-scroll'}>
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
/*
w-full flex flex-row justify-start items-stretch gap-6 overflow-x-auto p-6 md:p-0 pretty-scroll'
*/