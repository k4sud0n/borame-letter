import React from 'react';
import fixImage from '../../assets/image/fix.png';

export interface ErrorViewerProps {
  error: Error | undefined | null;
}

const ErrorViewer = ({ error }: ErrorViewerProps): JSX.Element => {
  return (
    <div className={'flex flex-col justify-center items-center gap-1 w-full p-4 bg-white h-full'}>
      <img className={'w-36 h-36 md:w-72 md:h-72'} src={fixImage} />
      <div className={'font-bold md:text-xl'}>
        오류가 발생했어요... 무슨 문제인지 빨리 확인해볼께요
      </div>
      <div className={'bg-slate-300 rounded font-mono px-1 whitespace-pre overflow-x-auto max-w-full'}>
        {error && (error.stack?.toString() ?? `${error.name}: ${error.message}`)}
        {!error && 'Error: No error reason'}
      </div>
    </div>
  );
}

export default ErrorViewer;
