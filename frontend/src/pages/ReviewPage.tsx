import Spinner from '@/components/common/Spinner';
import ReviewCard from '@/components/review/ReviewCard';
import Endpoints from '@/constants/endpoints';
import useSWR from 'swr';
import { CSSTransition } from 'react-transition-group';
import Review from '@/types/Review';
import ErrorViewer from '@/components/ErrorViewer';

const ReviewPage = (): JSX.Element => {
  const { data, error } = useSWR<Review[]>(Endpoints.REVIEW_LIST);

  return (
    <div className={'grow relative'}>
      <CSSTransition in={!!data} timeout={250} classNames={'fade-scale'} mountOnEnter unmountOnExit>
        <div className={'absolute inset-0 grow md:container md:mx-auto p-3 flex flex-col gap-3'}>
          {
            (data?.length ?? 0) > 0
              ? (
                data?.map((post) => (
                  <ReviewCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    star={post.rating}
                    summary={post.content.slice(0, 50)}
                    date={new Date(post.created_at)}
                    writer={post.writer}
                  />
                ))
              )
              : (
                <div>
                  아직 아무런 리뷰가 없어요
                </div>
              )
          }
        </div>
      </CSSTransition>
      <CSSTransition in={!data && !error} timeout={250} classNames={'fade-scale'} unmountOnExit mountOnEnter>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center'}>
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
};

export default ReviewPage;
