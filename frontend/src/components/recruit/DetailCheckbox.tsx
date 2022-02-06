import React from 'react';
import Checkbox from '../common/Checkbox';

export interface DetailCheckboxProps {
  topic: Record<string, string>;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const DetailCheckbox = React.memo(({ topic, name, onChange }: DetailCheckboxProps): JSX.Element => (
  <div className={'flex flex-row justify-center items-center gap-1'}>
    <Checkbox id={name} onChange={onChange} />
    <label htmlFor={name}>{topic[name]}</label>
  </div>
));

export default DetailCheckbox;
