import React from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

export interface DetailCheckboxProps {
  icon: IconifyIcon | string;
  id: string;
  title: string;
  extra?: string;
  extraPattern?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onExtra?: React.ChangeEventHandler<HTMLInputElement>;
}

const DetailCheckbox = React.memo(({ icon, id, title, onChange, extra, extraPattern, onExtra }: DetailCheckboxProps): JSX.Element => (
  <span className={'flex flex-col gap-3 items-center select-none'}>
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
    {
      extra
        ? (
          <input
            type={'text'}
            name={id}
            pattern={extraPattern}
            required={extra !== undefined && !!(document.getElementById(id) as HTMLInputElement)?.checked}
            className={`border-2 outline-none border-slate-100 bg-slate-100 rounded-lg p-3
            hover:bg-slate-300 focus:border-slate-300 valid:border-sky-500 focus:valid:border-sky-500 invalid:border-red-500 focus:invalid:border-red-500 transition-all
              origin-top scale-y-0 w-0 peer-checked:scale-y-100 peer-checked:w-full
            `}
            placeholder={extra}
            onChange={onExtra}
          />
        )
        : null
    }
  </span>
));

export default DetailCheckbox;
