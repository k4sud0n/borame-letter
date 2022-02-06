import React from 'react';
import { Link, useLocation } from 'wouter';

const Header = () => {
    const [location] = useLocation();

    return (
        <header className={'sticky border-b border-inherit'}>
            <div className={'container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'}>
                <Link className={'flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'} href="/">
                    {/* <img alt="logo" src="/static/media/logo.3d6f9bd2.svg" className={'w-8 h-8 -mr-1'} /> */}
                    <span className={'ml-3 text-xl text-sky-500'}>보라매</span><span className={'text-xl text-gray-900'}>인편</span>
                </Link>

                <nav className={'md:ml-auto flex flex-wrap items-center text-base justify-center text-center'}>
                    <Link className={`mr-2.5 ml-2.5 hover:text-sky-500 ${location === '/about' ? 'text-sky-500' : ''}`} href="/about">공지사항</Link>
                    <Link className={`mr-2.5 ml-2.5 hover:text-sky-500 ${location === '/achievements' ? 'text-sky-500' : ''}`} href="/achievements">후기</Link>
                    <Link className={`mr-2.5 ml-2.5 hover:text-sky-500 ${location === '/recruit' ? 'text-sky-500' : ''}`} href="/recruit">신청하기</Link>
                </nav>
            </div> 
        </header>
    )
}

export default Header;