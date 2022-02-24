import StarZero from '@iconify/icons-mdi/star-outline';
import StarFull from '@iconify/icons-mdi/star';
import { Icon } from '@iconify/react';
import React, { useRef } from 'react';
import useDragEvent from '@/hooks/useDragEvent';

export interface StarProps {
  rating: number;
  size?: number;
  onChange?: (rating: number) => void;
}

const list = [1, 2, 3, 4, 5];

const Star = React.memo(({ rating, size, onChange }: StarProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const events = useDragEvent(({ offsetX }) => {
    const width = ref.current?.clientWidth;
    
    if (typeof width === 'number') {
      const value = Math.ceil((offsetX / width) * 5);
      onChange?.(Math.min(Math.max(value, 1), 5));
    }
  }, [ref, onChange]);

  return (
    <span
      {...events}
      ref={ref}
      className={`flex flex-row justify-center items-center w-fit text-yellow-400
        ${!!onChange ? 'cursor-pointer' : ''}
      `}
      style={
        typeof size === 'number'
        ? {
          fontSize: `${size}px`,
        }
        : undefined
      }
    >
      {
        list.map((v) => (
          <Icon key={v} icon={rating < v ? StarZero : StarFull} />
        ))
      }
    </span>
  );
});

export default Star;
