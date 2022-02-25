import React from 'react';
import { Link } from 'wouter';

export interface NoticeCardProps {
  id: string;
  title: string;
  writer: string;
  summary?: string;
  date?: Date;
  thumbnail?: string;
}

const NoticeCard = React.memo(({ id, title, writer, summary, date, thumbnail }: NoticeCardProps): JSX.Element => (
  <Link
    href={`/notice/${id}`}
    className={`
      flex flex-row justify-start items-center bg-slate-200 rounded-lg cursor-pointer transition-all gap
      border-4 border-slate-200
      hover:border-slate-300 active:bg-slate-300
      h-28
    `}
  >
    {thumbnail && (
      <div className={'h-full aspect-square basis-0 rounded-lg bg-slate-100'}>
        <img src={thumbnail} className={'w-full h-full'} />
      </div>
    )}
    <div className={'grow shrink-0 flex flex-col justify-start items-start p-3'}>
      <div className={'text-lg font-bold'}>{title}</div>
      <div className={'text-md text-slate-500 font-light'}>{summary}</div>
      {(date || writer) && (
        <div className={'text-sm self-end text-slate-500 flex flex-row gap-1'}>
          <span>{writer}</span>
          {date && writer && <span className={'bg-slate-500 self-stretch min-w-[1px] min-h-[1px] my-[3px]'} />}
          {date && <span>{date.getFullYear()}. {date.getMonth() + 1}. {date.getDate().toString().padStart(2, '0')}.</span>}
        </div>
      )}
    </div>
  </Link>
));

export default NoticeCard;
