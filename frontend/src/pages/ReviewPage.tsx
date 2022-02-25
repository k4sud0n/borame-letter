import Spinner from '@/components/common/Spinner';
import ReviewCard from '@/components/review/ReviewCard';
import Endpoints from '@/constants/endpoints';
import { CSSTransition } from 'react-transition-group';
import ErrorViewer from '@/components/ErrorViewer';
import { Icon } from '@iconify/react';
import EditIcon from '@iconify/icons-mdi/edit';
import { useCallback, useMemo } from 'react';
import { Link } from 'wouter';
import ReviewResponse from '@/types/ReviewResponse';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

const getKey: SWRInfiniteKeyLoader = (index, previousData) => {
  if (previousData && previousData.total < previousData.size * previousData.page) return null;

  return `${Endpoints.REVIEW_LIST}?page=${index + 1}&size=10`;
}

const ReviewPage = (): JSX.Element => {
  const { data, error, setSize } = useSWRInfinite<ReviewResponse>(getKey);

  const loadNextPage = useCallback(() => {
    setSize((it) => it + 1);
  }, []);

  const items = useMemo(() => data?.map((it) => it.items)?.flat(), [data]);
  const isMore = useMemo(() => {
    if (data) {
      const lastResponse = data[data.length - 1];

      return lastResponse.total > lastResponse.size * lastResponse.page;
    }

    return true;
  }, [data]);

  return (
    <>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'md:container md:mx-auto p-3 w-full flex flex-col gap-3'}>
          {!!data && (
            <Link href={'/upload/review'}>
              <div
                className={`
                  w-fit h-12 p-2 right-4 bottom-4 rounded
                  bg-sky-500 shadow-sky-500/50 transition-shadow shadow-md hover:shadow-lg hover:shadow-sky-500/50
                  flex flex-row justify-center items-center cursor-pointer gap-1 text-white font-semibold self-end
                `}
              >
                <Icon className={'text-lg text-white'} icon={EditIcon} />
                후기 쓰기
              </div>
            </Link>
          )}
          <div className={'grow flex flex-col overflow-y-auto gap-3 '}>
            {
              (items?.length ?? 0) > 0
                ? (
                  <>
                    {items?.map((post) => (
                      <ReviewCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        star={post.rating}
                        summary={post.content?.slice?.(0, 50) ?? ''}
                        date={new Date(post.created_at)}
                        writer={post.writer}
                      />
                    ))}
                    {isMore && (
                      <button
                        className={'rounded-full bg-sky-500 px-4 py-2 text-white font-semibold hover:bg-sky-400 self-center'}
                        onClick={loadNextPage}
                      >
                        더 불러오기
                      </button>
                    )}
                  </>
                )
                : (
                  <div>
                    아직 아무런 리뷰가 없어요
                  </div>
                )
            }
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={!data && !error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'grow border-sky-500 flex flex-col justify-center items-center'}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
      <CSSTransition in={!!error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'grow flex flex-col justify-center items-center'}>
          <ErrorViewer error={error} />
        </div>
      </CSSTransition>
    </>
  );
};

export default ReviewPage;
