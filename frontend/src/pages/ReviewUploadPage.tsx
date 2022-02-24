import Spinner from '@/components/common/Spinner';
import ErrorViewer from '@/components/ErrorViewer';
import Star from '@/components/review/Star';
import Endpoints from '@/constants/endpoints';
import useRequest from '@/hooks/useRequest';
import ReviewRequest from '@/types/ReviewRequest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface ReviewUploadPageProps {

}

const ReviewUploadPage = ({ }: ReviewUploadPageProps): JSX.Element => {
  const ref = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [rating, setRating] = useState(5);
  const { data, error, isValidating, fetcher } = useRequest<ReviewRequest>(Endpoints.REVIEW_LIST);

  const onRatingChange = useCallback((rating: number) => {
    setRating(rating);
  }, []);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    event.preventDefault();

    if (
      ref.current?.checkValidity()
      && titleRef.current?.value
      && nameRef.current?.value
      && passwordRef.current?.value
      && contentRef.current?.value
    ) {
      fetcher({
        title: titleRef.current.value,
        writer: nameRef.current.value,
        password: passwordRef.current.value,
        rating,
        content: contentRef.current.value,
      });
    } else {
      ref.current?.reportValidity();
    }
  }, [ref, rating]);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div className={'grow relative'}>
      <form
        ref={ref}
        className={'container md:mx-auto flex flex-col flex-wrap w-full h-full gap-3 p-6'}
      >
        <div className={'flex flex-row justify-start items-center gap-3 w-full'}>
          제목
          <input
            ref={titleRef}
            required
            type={'text'}
            name={'title'}
            className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 grow
          hover:bg-slate-300 focus:border-slate-300
          valid:border-sky-500 focus:valid:border-sky-500
          invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
            placeholder={'제목'}
          />
        </div>
        <div className={'flex flex-row justify-start items-center gap-3 flex-wrap w-full'}>
          <div className={'flex flex-row gap-3 grow justify-start items-center'}>
            이름
            <input
              ref={nameRef}
              required
              type={'text'}
              name={'name'}
              className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 grow
            hover:bg-slate-300 focus:border-slate-300
            valid:border-sky-500 focus:valid:border-sky-500
            invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
              placeholder={'이름'}
            />
          </div>
          <div className={'flex flex-row gap-3 grow justify-start items-center'}>
            비밀번호
            <input
              ref={passwordRef}
              required
              type={'password'}
              name={'password'}
              className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 grow
            hover:bg-slate-300 focus:border-slate-300
            valid:border-sky-500 focus:valid:border-sky-500
            invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
              placeholder={'비밀번호'}
            />
          </div>
        </div>
        <div className={'flex flex-row gap-3 justify-start items-center'}>
          별점
          <Star size={36} rating={rating} onChange={onRatingChange} />
        </div>
        <textarea
          ref={contentRef}
          required
          name={'content'}
          className={`grow outline-none bg-slate-100 p-3 rounded resize-none
        border-2 border-slate-100
        valid:border-sky-500 focus:valid:border-sky-500
        invalid:border-red-500 focus:invalid:border-red-500 transition-all`}
        />
        <div className={'flex flex-row justify-between items-center'}>
          <div className={'text-slate-300 text-sm shrink'}>
            비밀번호는 후기 수정, 삭제시에 사용됩니다. 자신이 사용하는 암호가 아닌, 간단한 숫자, 영어등을 사용해주세요
          </div>
          <button
            className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold hover:bg-sky-400 min-w-fit'}
            onClick={onSubmit}
          >
            업로드
          </button>
        </div>
      </form>
      <CSSTransition in={isValidating} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'border-sky-500 fixed inset-0 flex flex-col justify-center items-center bg-slate-500 bg-opacity-30'}>
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
}

export default ReviewUploadPage;
