import Banner from '@/components/Banner';
import Introduce from '@/components/Introduce';

const MainPage = (): JSX.Element => {
  return (
    <div className={'flex flex-col grow'}>
      <Banner />
      <Introduce />
    </div>
  );
};

export default MainPage;
