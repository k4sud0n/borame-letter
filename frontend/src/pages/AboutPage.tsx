import AboutCard from '@/components/about/AboutCard';
import Spinner from '@/components/common/Spinner';

const AboutPage = (): JSX.Element => {
  return (
    <div className={'grow md:container md:mx-auto p-3 flex flex-col'}>
      <AboutCard
        id={'test'}
        title={'테스트 공지사항'}
        summary={'테스트입니다'}
        date={new Date()}
        thumbnail={'../../../assets/image/background1.png'}
      />
    </div>
  );
};

export default AboutPage;
