import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Introduce from '@/components/Introduce';

const MainPage = (): JSX.Element => {
  return (
    <div className={'flex flex-col'}>
      <Banner />
      <Introduce />
    </div>
  );
};

export default MainPage;
