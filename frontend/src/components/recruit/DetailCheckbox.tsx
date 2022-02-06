import React from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

export interface DetailCheckboxProps {
  icon: IconifyIcon | string;
  id: string;
  title: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const DetailCheckbox = React.memo(({ icon, id, title, onChange }: DetailCheckboxProps): JSX.Element => (
  <span>
    <input type={'checkbox'} id={id} className={'hidden peer'} onChange={onChange} />
    <label
      htmlFor={id}
      className={`
        flex flex-col justify-center items-center gap-1 rounded-lg bg-slate-200 p-3 cursor-pointer transition-all
        hover:bg-slate-300 ring-sky-500 active:scale-95
        peer-checked:ring-4
      `}
    >
      {typeof icon === 'string' && <img className={'w-12 h-12'} src={icon} />}
      {typeof icon !== 'string' && <Icon icon={icon} className={'w-12 h-12'} />}
      <div className={'font-semibold whitespace-nowrap'}>
        {title}
      </div>
    </label>
  </span>
));

export default DetailCheckbox;
