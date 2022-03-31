import Spinner from '@/components/common/Spinner';
import Star from '@/components/review/Star';
import Endpoints from '@/constants/endpoints';
import Review from '@/types/Review';
import { Icon } from '@iconify/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';
import DeleteIcon from '@iconify/icons-mdi/delete';
import EditIcon from '@iconify/icons-mdi/edit';
import Modal from '@/components/common/Modal';
import { useLocation } from 'wouter';
import useRequest from '@/hooks/useRequest';
import backgroundImage from '../../../assets/image/background3.jpg';

const localeOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export interface ReviewPostPageProps {
  id: string;
}

const ReviewPostPage = ({ id }: ReviewPostPageProps): JSX.Element => {
  const [, setLocation] = useLocation();

  const { data, error } = useSWR<Review>(Endpoints.REVIEW(id));

  const { data: deleteResponseData, error: deleteResponseError, fetcher } = useRequest(Endpoints.REVIEW(id), {
    method: 'DELETE',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(false);

  const onPassword = useCallback(() => {
    fetcher({
      password: passwordRef.current?.value,
    });
  }, [passwordRef]);

  const onEdit = useCallback(() => {
    setLocation(`/review/edit/${id}`);
  }, [id]);
  const onDelete = useCallback(() => {
    setModal(true);
  }, []);

  useEffect(() => {
    if (deleteResponseData) {
      setLocation('/review', { replace: true });
    }

    if (deleteResponseError) {
      passwordRef.current?.setCustomValidity('비밀번호가 일치하지 않습니다.');
      formRef.current?.reportValidity();
    }
  }, [!!deleteResponseData, !!deleteResponseError, passwordRef, formRef])

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
            <img className={'absolute w-full h-full inset-0 -z-10 object-cover blur-sm'} src={backgroundImage} />
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
            <div className={'absolute right-3 bottom-3 flex flex-col gap-3'}>
              <div
                className={`
                  w-fit px-4 py-2 rounded-lg text-base
                  bg-red-500 shadow-red-500/50 transition-shadow shadow-md hover:shadow-lg hover:shadow-red-500/50
                  flex flex-row justify-center items-center cursor-pointer gap-1 text-white font-semibold self-end
                `}
                onClick={onDelete}
              >
                <Icon icon={DeleteIcon} />
                삭제
              </div>
              <div
                className={`
                  w-fit px-4 py-2 rounded-lg text-base
                  bg-sky-500 shadow-sky-500/50 transition-shadow shadow-md hover:shadow-lg hover:shadow-sky-500/50
                  flex flex-row justify-center items-center cursor-pointer gap-1 text-white font-semibold self-end
                `}
                onClick={onEdit}
              >
                <Icon icon={EditIcon} />
                수정
              </div>
            </div>
          </div>
          <div className={'w-full grow bg-white p-6 text-md md:px-72 whitespace-pre-wrap'}>
            {data?.content}
          </div>
          <Modal
            title={'비밀번호를 입력하세요'}
            open={modal}
            positive={'확인'}
            onClose={() => setModal(false)}
            onButtonClick={onPassword}
          >
            <form ref={formRef}>
              <input
                ref={passwordRef}
                type={'password'}
                name={'password'}
                className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3 w-full
                hover:bg-slate-300 focus:border-slate-300 valid:border-sky-500 focus:valid:border-sky-500 invalid:border-red-500 focus:invalid:border-red-500 transition-all peer`}
                placeholder={'비밀번호'}
              />
            </form>
          </Modal>
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
