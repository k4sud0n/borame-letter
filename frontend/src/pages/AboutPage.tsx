const AboutPage = (): JSX.Element => {
  return (
    <div className={'grow md:container md:mx-auto flex flex-col py-12'}>
      <div
        className={`
          flex flex-col justify-start items-start bg-slate-200 rounded-lg p-3 cursor-pointer transition-all
          border-4 border-slate-200
          hover:border-slate-300 active:bg-slate-300
        `}
      >
        <div className={'text-lg font-bold'}>공지사항 제목</div>
        <div className={'text-md text-slate-500 font-light'}>공지사항 내용 요약</div>
        <div className={'text-sm self-end text-slate-500'}>2021. 11. 08.</div>
      </div>
    </div>
  );
};

export default AboutPage;
