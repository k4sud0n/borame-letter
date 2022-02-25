import React, { CSSProperties, HTMLInputTypeAttribute } from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Checkbox = ({ className, ...props}: CheckboxProps): JSX.Element => {
  return (
    <div className={'relative w-4 h-4'}>
      <input
        type={'checkbox'}
        className={`
          appearance-none w-4 h-4 bg-slate-100 border border-slate-300 rounded cursor-pointer absolute transition-all peer
          checked:bg-sky-500 checked:border-sky-500
          ${className}
        `}
        {...props}
      />
      <svg
        className={'w-4 h-4 absolute stroke-white fill-transparent pointer-events-none stroke-2 stroke-dashoffset-16 stroke-dasharray-16 peer-checked:stroke-dashoffset-0 transition-all duration-500 inset-0'}
        viewBox={'0 0 16 16'}
      >
        <path d={'M3 8 L7 12 L13 4'} />
      </svg>
    </div>
  );
}

export default Checkbox;
