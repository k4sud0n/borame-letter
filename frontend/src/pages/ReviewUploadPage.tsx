import Spinner from '@/components/common/Spinner';
import ErrorViewer from '@/components/ErrorViewer';
import Star from '@/components/review/Star';
import Endpoints from '@/constants/endpoints';
import useQuery from '@/hooks/useQuery';
import useRequest from '@/hooks/useRequest';
import Review from '@/types/Review';
import ReviewRequest from '@/types/ReviewRequest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';
import { useLocation } from 'wouter';

export interface ReviewUploadPageProps {
  id?: string;
}

const ReviewUploadPage = ({
  id,
}: ReviewUploadPageProps): JSX.Element => {
  const [, setLocation] = useLocation();

  const { data: reviewData } = useSWR<Review>(id ? Endpoints.REVIEW(id) : null);

  const ref = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState(5);

  const { data, error, isValidating, fetcher } = useRequest<ReviewRequest, Review>(
    id ? Endpoints.REVIEW(id) : Endpoints.REVIEW_LIST,
    {
      method: id ? 'PATCH' : 'POST',
    }
  );

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setTitle(event.target.value);
  }, []);
  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setName(event.target.value);
  }, []);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  const onContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    setContent(event.target.value);
  }, []);
  const onRatingChange = useCallback((rating: number) => {
    setRating(rating);
  }, []);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    event.preventDefault();

    if (ref.current?.checkValidity()) {
      const body: ReviewRequest = {
        title,
        writer: name,
        password,
        rating,
        content,
      };

      if (id) body.id = id;

      fetcher(body);
    } else {
      ref.current?.reportValidity();
    }
  }, [id, ref, title, name, password, rating, content]);

  useEffect(() => {
    if (data) {
      setLocation(`/review/${data.id}`, { replace: true });
    }
  }, [data]);

  useEffect(() => {
    if (reviewData) {
      setTitle(reviewData.title);
      setName(reviewData.writer);
      setContent(reviewData.content);
      setRating(reviewData.rating);
    }
  }, [reviewData]);

  return (
    <div className={'grow relative'}>
      <form
        ref={ref}
        className={'container md:mx-auto flex flex-col flex-wrap w-full h-full gap-3 p-6'}
      >
        <div className={'flex flex-row justify-start items-center gap-3 w-full'}>
          제목
          <input
            required
            type={'text'}
            name={'title'}
            value={title}
            onChange={onTitleChange}
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
              required
              type={'text'}
              name={'name'}
              value={name}
              onChange={onNameChange}
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
              required
              type={'password'}
              name={'password'}
              value={password}
              onChange={onPasswordChange}
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
          required
          name={'content'}
          value={content}
          onChange={onContentChange}
          className={`grow outline-none bg-slate-100 p-3 rounded resize-none
        border-2 border-slate-100 min-h-[320px]
        valid:border-sky-500 focus:valid:border-sky-500
        invalid:border-red-500 focus:invalid:border-red-500 transition-all`}
        />
        <div className={'flex flex-row justify-between items-center flex-wrap gap-2'}>
          <div className={'text-slate-300 text-sm shrink'}>
            비밀번호는 후기 수정, 삭제시에 사용됩니다. 자신이 사용하는 암호가 아닌, 간단한 숫자, 영어등을 사용해주세요
          </div>
          <button
            className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold hover:bg-sky-400 min-w-fit'}
            onClick={onSubmit}
          >
            {id ? '수정하기' : '업로드'}
          </button>
        </div>
      </form>
      <CSSTransition in={isValidating || !!(id && !reviewData)} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'border-sky-500 fixed inset-0 flex flex-col justify-center items-center bg-slate-500 bg-opacity-30'}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
      <CSSTransition in={!!error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'absolute inset-0 flex flex-col justify-center items-center bg-white'}>
          <ErrorViewer error={Error(JSON.stringify(error))} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default ReviewUploadPage;
