import DetailCheckbox from '@/components/recruit/DetailCheckbox';
import useQuery from '@/hooks/useQuery';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { useMediaMatch } from 'rooks';

const topic = {
  news: {
    news: '뉴스',
    'covid-19': '코로나 19',
    bitcoin: '암호화폐',
    stock: '주식',
    politics: '정치',
    weather: '날씨',
    entertain: '연예',
  },
  sports: {
    kbo: 'KBO',
    mlb: 'MLB',
    championsLeague: '챔피언스 리그',
    otherSports: '스포츠를 잘 몰라서 ㅎ',
  },
  game: {
    lol: '리그 오브 레전드',
    maple: '메이플스토리',
    otherGame: '무슨 게임이 있을까',
  },
  other: {
    something: '기타 무언가...',
  }
}

const allTopic: Record<string, string> = Object.values(topic).reduce((prev, curr) => ({ ...prev, ...curr }), {});

const RecruitDetailPage = (): JSX.Element => {
  const name = useQuery('name');
  const gen = useQuery('gen');
  const date = useQuery('date');
  
  const isNarrow = useMediaMatch('(max-width: 600px)');

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const onCheck: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { checked, id } = event.target;

    if (checked) {
      setSelected((it) => Array.from(new Set(it.concat(id))));
    } else {
      setSelected((it) => [...it.filter((subject) => subject !== id)]);
    }
  }, []);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => i + 1);
    }, 1500);

    return () => { clearInterval(interval) };
  }, []);

  return (
    <div className={'md:container md:mx-auto grow flex flex-col justify-center items-center center gap-3'}>
      <div className={'text-2xl font-bold text-centerr'}>
        {gen}기 {name} 훈련병에게{' '}
        <TextTransition
          inline={!isNarrow}
          className={'text-sky-500'}
          text={selected.length > 0 ? `"${allTopic[selected[index % selected.length]]}"` : '어떤'}
          springConfig={presets.default}
        />
        {' '}
        <TextTransition
          inline={!isNarrow}
          text={selected.length > 0 ? '뉴스를 편지로 보냅니다' : '뉴스를 편지로 보낼까요?'}
          springConfig={presets.default}
        />
      </div>
      <div className={'text-lg'}>뉴스</div>
      <div className={'flex flex-row flex-wrap justify-center items-center gap-4'}>
        {
          Object.keys(topic.news).map((key) => (
            <DetailCheckbox key={key} name={key} topic={topic.news} onChange={onCheck} />
          ))
        }
      </div>
      <div className={'text-lg'}>스포츠</div>
      <div className={'flex flex-row flex-wrap justify-center items-center gap-4'}>
        {
          Object.keys(topic.sports).map((key) => (
            <DetailCheckbox key={key} name={key} topic={topic.sports} onChange={onCheck} />
          ))
        }
      </div>
      <div className={'text-lg'}>게임</div>
      <div className={'flex flex-row flex-wrap justify-center items-center gap-4'}>
        {
          Object.keys(topic.game).map((key) => (
            <DetailCheckbox key={key} name={key} topic={topic.game} onChange={onCheck} />
          ))
        }
      </div>
      <div className={'text-lg'}>기타</div>
      <div className={'flex flex-row flex-wrap justify-center items-center gap-4'}>
        {
          Object.keys(topic.other).map((key) => (
            <DetailCheckbox key={key} name={key} topic={topic.other} onChange={onCheck} />
          ))
        }
      </div>
    </div>
  );
}

export default RecruitDetailPage;
