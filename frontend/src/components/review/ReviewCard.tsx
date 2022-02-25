import React from 'react';
import { Link } from 'wouter';
import Star from './Star';

export interface ReviewCardProps {
  id: string;
  title: string;
  writer: string;
  star: number;
  summary?: string;
  date?: Date;
}

const ReviewCard = React.memo(({ id, title, writer, summary, date, star }: ReviewCardProps): JSX.Element => (
  <Link
    href={`/review/${id}`}
    className={`
      flex flex-col justify-start items-start p-3 bg-slate-200 rounded-lg cursor-pointer transition-all gap
      border-4 border-slate-200
      hover:border-slate-300 active:bg-slate-300
    `}
  >
    <div className={'text-lg font-bold'}>{title}</div>
    <div className={'text-md text-slate-500 font-light'}>{summary}</div>
    <div className={'flex flex-row justify-between w-full'}>
      <Star rating={star} />
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

export default ReviewCard;
