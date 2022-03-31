import { Link, useLocation } from 'wouter';

const ErrorPage = (): JSX.Element => {
  const [location] = useLocation();

  return (
    <div className={'grow md:container flex flex-col justify-center items-center w-full p-5'}>
      <img className={'w-36 h-36 md:w-72 md:h-72'} src={require('../../assets/image/search.png')} />
      <div className={'flex flex-row'}>
        <Link className={'text-sky-500'} href={window.location.origin}>
          {window.location.origin}
        </Link>
        {location} 경로를 찾지 못했어요
      </div>
    </div>
  )
};

export default ErrorPage;
