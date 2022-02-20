import AboutCard from '@/components/about/AboutCard';
import Spinner from '@/components/common/Spinner';
import NoticePost from '@/types/NoticePost';
import { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AboutPage = (): JSX.Element => {
  const [posts, setPosts] = useState<NoticePost[]>([]);
  const [load, setLoad] = useState(true);

  const fetchData = useCallback(async () => {
    setLoad(true);
    try {
      const response = await fetch('https://local.sihyun.codes/notice');
      const list = await response.json();

      if (Array.isArray(list)) setPosts(list);
      else throw Error('not array how??');
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={'grow relative'}>
      <CSSTransition in={!load} timeout={250} classNames={'fade-scale'} mountOnEnter>
        <div className={'absolute inset-0 grow md:container md:mx-auto p-3 flex flex-col gap-3'}>
          {
            posts.map((post) => (
              <AboutCard
                id={post.id}
                title={post.title}
                summary={post.content.slice(0, 50)}
                date={new Date(post.created_at)}
                writer={post.writer}
              />
            ))
          }
        </div>
      </CSSTransition>
      <CSSTransition in={load} timeout={250} classNames={'fade-scale'} unmountOnExit>
        <div className={'border-sky-500 absolute inset-0 flex flex-col justify-center items-center '}>
          <Spinner size={48} ring={3} time={2} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default AboutPage;
