import Banner from '@/components/main/Banner';
import Introduce from '@/components/main/Introduce';

const MainPage = (): JSX.Element => {
  return (
    <div className={'flex flex-col grow'}>
      <Banner />
      <Introduce />
    </div>
  );
};

export default MainPage;
