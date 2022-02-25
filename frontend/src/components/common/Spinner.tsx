import React, { useMemo } from 'react';

export interface SpinnerProps {
  size?: number;
  width?: number;
  color?: string;
  time?: number;
  ring?: number;
}

const Spinner = React.memo(({
  size = 24,
  width = 2,
  color = 'inherit',
  time = 1.5,
  ring = 3,
}: SpinnerProps): JSX.Element => {
  const style = useMemo(() => ({
    '--spinner-size': `${size}px`,
    '--spinner-width': `${width}px`,
    '--spinner-time': `${time}s`,
    borderColor: color,
  }), [size, width, time, color]);

  return (
    <div
      className={'spinner'}
      style={style}
    >
      {Array.from({ length: ring }).map((_, index) => (
        <div
          key={index}
          style={{
            animationDelay: `${-index / ring * time}s`,
          }}
        />
      ))}
    </div>
  );
});

export default Spinner;
