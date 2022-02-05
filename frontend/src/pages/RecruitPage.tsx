import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';

const getBirthday = (): string  => {
  const now = new Date();

  const year = now.getFullYear() - 20;
  const month = now.getMonth().toString().padStart(2, '0');
  const day = now.getDay().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const gen832 = new Date(2021, 10, 8);
const getGeneration = (): number => {
  const diff = Date.now() - gen832.getTime();

  return 832 + ~~(diff / (1000 * 60 * 60 * 24 * 30));
}

const inputWrapperStyle = 'flex flex-col justify-items-center items-start gap-1 group';

/*
이름 기수 생년월일
*/
const RecruitPage = (): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [gen, setGen] = useState(getGeneration());
  const [date, setDate] = useState(getBirthday());

  const [, navigate] = useLocation();

  const onGenChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setGen(Number(event.target.value));
  }, []);

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setDate(event.target.value);
  }, []);

  const goNext = useCallback(() => {
    const name = nameRef.current?.value ?? '';

    navigate(`/recruit/details?name=${name}&gen=${gen}&date=${date}`);
  }, [nameRef, gen, date]);

  return (
    <div className={'md:container md:mx-auto grow flex flex-col justify-center items-center gap-4'}>
      <div className={'text-xl'}>
        신청할 훈련병의 정보를 기입해주세요
      </div>
      <div className={inputWrapperStyle}>
        <div className={'text-slate-400 group-hover:text-slate-500'}>이름</div>
        <input
          ref={nameRef}
          type={'text'}
          className={'border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 hover:bg-slate-200 focus:border-slate-300 focus:valid:border-sky-500 invalid:border-red-500 transition-all'}
          placeholder={'이름'}
        />
      </div>
      <div className={inputWrapperStyle}>
        <div className={'text-slate-400 group-hover:text-slate-500'}>기수</div>
        <input
          type={'number'}
          className={'border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 hover:bg-slate-200 focus:border-slate-300 focus:valid:border-sky-500 invalid:border-red-500 transition-all'}
          min={800}
          value={gen}
          onChange={onGenChange}
          placeholder={'기수'}
        />
      </div>
      <div className={inputWrapperStyle}>
        <div className={'text-slate-400 group-hover:text-slate-500'}>생년월일</div>
        <input
          type={'date'}
          className={'bg-slate-100 rounded-lg p-3  hover:bg-slate-200 focus:bg-slate-300 transition-all'}
          value={date}
          onChange={onDateChange}
        />
      </div>
      <button className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold hover:bg-sky-400'} onClick={goNext}>다음</button>
    </div>
  );
}

export default RecruitPage;
