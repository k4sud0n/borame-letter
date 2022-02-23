import StarZero from '@iconify/icons-mdi/star-outline';
import StarHalf from '@iconify/icons-mdi/star-half';
import StarFull from '@iconify/icons-mdi/star';
import { Icon } from '@iconify/react';
import React from 'react';

export interface StarProps {
  rating: number;
}

const list = [1, 2, 3, 4, 5];

const Star = React.memo(({ rating }: StarProps) => (
  <span className={'flex flex-row justify-center items-center'}>
    {
      list.map((v) => (
        <Icon key={v} icon={rating < v ? StarZero : StarFull} />
      ))
    }
  </span>
));

export default Star;
