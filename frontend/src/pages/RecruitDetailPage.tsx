import DetailCheckbox from '@/components/recruit/DetailCheckbox';
import Endpoints from '@/constants/endpoints';
import TopicUtil, { newsTopic, otherTopic, sportsTopic, Topic } from '@/constants/topic';
import useQuery from '@/hooks/useQuery';
import useRequest from '@/hooks/useRequest';
import LetterRequest from '@/types/LetterRequest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { useMediaMatch } from 'rooks';
import useSWR from 'swr';
import { CSSTransition } from 'react-transition-group';
import Spinner from '@/components/common/Spinner';
import UserCheckResponse from '@/types/UserCheckResponse';
import User from '@/types/User';
import Category from '@/types/Category';
import ErrorViewer from '@/components/ErrorViewer';

const RecruitDetailPage = (): JSX.Element => {
  const name = useQuery('name');
  const gen = useQuery('gen');
  const date = useQuery('date');

  const formRef = useRef<HTMLFormElement>(null);
  const isNarrow = useMediaMatch('(max-width: 600px)');

  const {
    data: checkData,
    error: checkError,
    isValidating: checkIsValidating,
  } = useRequest<Omit<User, 'category'>, UserCheckResponse, { detail: string }>(
    Endpoints.USER_CHECK,
    {
      startWith: (
        name && gen && date
          ? {
            name: name,
            cardinal_number: Number(gen),
            birth_year: new Date(date).getFullYear(),
            birth_month: new Date(date).getMonth() + 1,
            birth_date: new Date(date).getDate(),
          }
          : undefined
      ),
    },
  );
  const { data, error, fetcher, isValidating } = useRequest<LetterRequest>(
    Endpoints.LETTER,
    {
      method: !!checkData ? 'PATCH' : 'POST',
    },
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<(keyof Category)[]>([]);
  const [stock, setStock] = useState('');
  const [crypto, setCrypto] = useState('');

  const onCheck: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { checked, id } = event.target;

    if (checked) {
      setSelected((it) => {
        setIndex(it.length);

        return Array.from(new Set(it.concat(id as keyof Category)))
      });
    } else {
      setSelected((it) => [...it.filter((subject) => subject !== id)]);
    }
  }, []);

  const onExtraData = useCallback((topic: Topic, event: React.ChangeEvent<HTMLInputElement>) => {
    if (topic.id === 'stock') setStock(event.target.value);
    if (topic.id === 'cryptocurrency') setCrypto(event.target.value);
  }, []);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (event) => {
    event.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    if (name && gen && date) {
      const dateObj = new Date(date);
      const category: Category = {
        'every_news': 0,
        'political_news': 0,
        'world_news': 0,
        'entertain_news': 0,
        'esports_news': 0,
        'korea_football': 0,
        'world_football': 0,
        'korea_baseball': 0,
        'world_baseball': 0,
        'stock': '0',
        'cryptocurrency': '0'
      };

      selected.forEach((key) => {
        switch(key) {
          case 'stock':
            category.stock = (selected.includes('stock') ? stock : '0') as `${number}`;
          case 'cryptocurrency':
            category.cryptocurrency = selected.includes('cryptocurrency') ? crypto : '0';
            break;
          default:
            category[key] = 1;
        }
      });

      fetcher({
        name,
        cardinal_number: Number(gen),
        birth_year: dateObj.getFullYear(),
        birth_month: dateObj.getMonth() + 1,
        birth_date: dateObj.getDate(),
        category,
      });
    }
  }, [name, gen, date, selected, stock, crypto]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => i + 1);
    }, 1000);

    return () => { clearInterval(interval) };
  }, [selected]);

  useEffect(() => {
    if (checkData) {
      const { category } = checkData.user;

      const newSelected = Object
        .entries(category)
        .filter(([, value]) => typeof value === 'string' ? value !== '0' : !!value)
        .reduce((prev, [key]) => ([...prev, key]), [] as string[]);

      if (category.stock !== '0') setStock(category.stock);
      if (category.cryptocurrency !== '0') setCrypto(category.cryptocurrency);
      setSelected(newSelected as (keyof Category)[]);
    }
  }, [checkData]);

  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);

  return (
    <div className={'grow'}>
      <CSSTransition in={!checkIsValidating} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <form
          ref={formRef}
          className={'md:container md:mx-auto grow flex flex-col justify-center items-center center gap-6 py-12'}
        >
          <div className={'text-2xl font-bold text-centerr'}>
            {gen}기 {name} 훈련병에게{' '}
            <TextTransition
              inline={!isNarrow}
              className={'text-sky-500'}
              text={selected.length > 0 ? `'${TopicUtil.get(selected[index % selected.length])?.title}'` : '어떤'}
              springConfig={presets.default}
            />
            {' '}
            <TextTransition
              inline={!isNarrow}
              text={selected.length > 0 ? '뉴스를 편지로 보냅니다' : '뉴스를 편지로 보낼까요?'}
              springConfig={presets.default}
            />
          </div>
          <div className={'max-w-full grow flex flex-col justify-start items-center gap-4'}>
            <div className={'max-w-full flex flex-col justify-center items-center gap-1'}>
              <div className={'text-lg font-semibold'}>뉴스</div>
              <div
                className={`
                  max-w-full inline-flex flex-row flex-nowrap justify-start items-center overflow-x-auto whitespace-nowrap gap-4
                  before:block before:w-4 after:block after:w-4 py-3
                `}
              >
                {
                  newsTopic.map((topic) => (
                    <DetailCheckbox
                      key={topic.id}
                      id={topic.id}
                      title={topic.title}
                      icon={topic.icon}
                      value={selected.includes(topic.id as keyof Category)}
                      onChange={onCheck}
                    />
                  ))
                }
              </div>
            </div>
            <div className={'max-w-full flex flex-col justify-center items-center gap-1'}>
              <div className={'max-w-full text-lg font-semibold'}>스포츠</div>
              <div
                className={`
                max-w-full inline-flex flex-row flex-nowrap justify-start items-center overflow-x-auto whitespace-nowrap gap-4
                before:block before:w-4 after:block after:w-4 py-3
              `}
              >
                {
                  sportsTopic.map((topic) => (
                    <DetailCheckbox
                      key={topic.id}
                      id={topic.id}
                      title={topic.title}
                      icon={topic.icon}
                      value={selected.includes(topic.id as keyof Category)}
                      onChange={onCheck}
                    />
                  ))
                }
              </div>
            </div>
            <div className={'max-w-full flex flex-col justify-center items-center gap-1'}>
              <div className={'max-w-full text-lg font-semibold'}>기타</div>
              <div
                className={`
                max-w-full inline-flex flex-row flex-nowrap justify-start items-start overflow-x-auto whitespace-nowrap gap-4
                before:block before:w-4 after:block after:w-4 py-3
              `}
              >
                {
                  otherTopic.map((topic) => (
                    <DetailCheckbox
                      key={topic.id}
                      id={topic.id}
                      extra={topic.extra}
                      extraPattern={topic.extraPattern}
                      description={topic.description}
                      title={topic.title}
                      icon={topic.icon}
                      value={selected.includes(topic.id as keyof Category)}
                      onChange={onCheck}
                      extraValue={(
                        topic.id === 'stock' ? stock :
                        topic.id === 'cryptocurrency' ? crypto
                        : undefined
                      )}
                      onExtra={(event) => onExtraData(topic, event)}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          <button
            className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold  hover:bg-sky-400 self-center'}
            onClick={onSubmit}
          >
            {!!checkData && '수정하기'}
            {!checkData && '신청하기'}
          </button>
        </form>
      </CSSTransition>
      <CSSTransition in={(!checkData && !checkError) || isValidating} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'border-sky-500 fixed inset-0 flex flex-col justify-center items-center bg-slate-500 bg-opacity-30'}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
      <CSSTransition in={!!error} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'absolute inset-0 border-sky-500 grow flex flex-col justify-center items-center'}>
          <ErrorViewer error={Error(JSON.stringify(error))} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default RecruitDetailPage;
