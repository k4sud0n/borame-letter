import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Introduce from '@/components/Introduce';

const MainPage = (): JSX.Element => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <Header />
      <Banner />
      <Introduce />
      <Footer />
    </div>
  );
};

export default MainPage;
