import Modal from '@/components/common/Modal';
import { PrivatePolicy } from '@/constants/policy';
import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'wouter';

const pattern = {
  name: '[가-힣][가-힣]+',
  gen: '[0-9]{3}([0-9]+)?',
  date: '[12][0-9]{3}-[01][0-9]-[0-3][0-9]',
}

const getMinBirthday = (): string  => {
  const now = new Date();

  const year = now.getFullYear() - 19;
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};

const gen832 = new Date(2021, 10, 8);
const getGeneration = (): number => {
  const diff = Date.now() - gen832.getTime();

  return 832 + ~~(diff / (1000 * 60 * 60 * 24 * 31));
}

const inputWrapperStyle = 'flex flex-col justify-items-center items-start gap-1 group';

const RecruitPage = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [gen, setGen] = useState(getGeneration());
  const [date, setDate] = useState(getMinBirthday());

  const [modal, setModal] = useState(false);

  const [, navigate] = useLocation();

  const onGenChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setGen(Number(event.target.value));
  }, []);

  const onDateChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setDate(event.target.value);
  }, []);

  const onNext: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    const isValid = formRef.current?.checkValidity();

    if (isValid) {
      setModal(true);
      //  navigate(`/recruit/details?name=${nameRef.current?.value}&gen=${gen}&date=${date}`);
    } else {
      formRef.current?.reportValidity();
    }

    event.preventDefault();
  }, [formRef, nameRef, gen, date]);

  const onAgree = useCallback(() => {
    const isValid = formRef.current?.checkValidity();

    if (isValid) {
      navigate(`/recruit/details?name=${nameRef.current?.value}&gen=${gen}&date=${date}`);
    } else {
      formRef.current?.reportValidity();
    }
  }, []);

  return (
    <div className={'md:container md:mx-auto grow flex flex-col justify-center items-center gap-4'}>
      <form ref={formRef} className={'flex flex-col justify-center items-stretch center gap-3'}>
        <div className={'text-xl text-center font-bold'}>
          신청할 훈련병의 정보를 기입해주세요
        </div>
        <div className={inputWrapperStyle}>
          <div className={'text-slate-400'}>이름</div>
          <input
            ref={nameRef}
            required
            type={'text'}
            name={'name'}
            pattern={pattern.name}
            className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 w-full
            hover:bg-slate-300 focus:border-slate-300 valid:border-sky-500 focus:valid:border-sky-500 invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
            placeholder={'이름'}
          />
          <div className={'invisible text-red-500 peer-invalid:visible text-sm'}>이름은 2글자 이상, 한글로만 구성되어야 합니다.</div>
        </div>
        <div className={inputWrapperStyle}>
          <div className={'text-slate-400'}>기수</div>
          <input
            required
            type={'number'}
            name={'gen'}
            className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 w-full
            hover:bg-slate-300 focus:border-slate-300 valid:border-sky-500 focus:valid:border-sky-500 invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
            min={800}
            pattern={pattern.gen}
            value={gen.toString()}
            onInput={onGenChange}
            placeholder={'기수'}
          />
          <div className={'invisible text-red-500 peer-invalid:visible text-sm'}>기수는 숫자로만 이루어져야 하며, 800기 이상이여야 합니다.</div>
        </div>
        <div className={inputWrapperStyle}>
          <div className={'text-slate-400'}>생년월일</div>
          <input
            required
            type={'date'}
            name={'date'}
            pattern={pattern.date}
            className={`w-full bg-slate-100 rounded-lg p-3  hover:bg-slate-200 focus:bg-slate-300 transition-all peer
              outline-none border-2 focus:border-slate-300 valid:border-sky-500 focus:valid:border-sky-500 invalid:border-red-500 focus:invalid:border-red-500
            `}
            value={date}
            max={getMinBirthday()}
            onChange={onDateChange}
          />
          <div className={'invisible text-red-500 peer-invalid:visible text-sm'}>생년월일은, 만 19세 이상으로 설정하여야 합니다.</div>
        </div>
        <button className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold  hover:bg-sky-400 self-center'} onClick={onNext}>다음</button>
      </form>
      <Modal
        title={PrivatePolicy.title}
        open={modal}
        positive={'동의'}
        onButtonClick={onAgree}
        onClose={() => setModal(false)}
      >
        {PrivatePolicy.content}
      </Modal>
    </div>
  );
}

export default RecruitPage;
