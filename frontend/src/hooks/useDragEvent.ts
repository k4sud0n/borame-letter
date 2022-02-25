import React, { useCallback, useEffect, useRef, useState } from 'react';

type Position = {
  // start position relative
  x: number;
  y: number;

  // Parent relative position
  offsetX: number;
  offsetY: number;

  // document position (without scroll)
  clientX: number;
  clientY: number;

  // document position (with scroll)
  pageX: number;
  pageY: number;

  // whole screen position
  screenX: number;
  screenY: number;
}

type DragCallback = (position: Position) => void;

const useDragEvent = <Element extends HTMLElement>(callback: DragCallback, deps: unknown[]) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [startData, setStartData] = useState<Pick<Position, 'x' | 'y'> | null>(null);

  const listener = useCallback(callback, deps);

  const onDrag = useCallback(({ clientX, clientY, ...rest }: Omit<Position, 'x' | 'y'>) => {
    if (startData !== null) {
      listener({
        x: clientX - startData.x,
        y: clientY - startData.y,
        clientX,
        clientY,
        ...rest,
      });

      return true;
    }

    return false;
  }, [startData, listener]);

  useEffect(() => {
    if (targetRect) {
      const mouseend = (event: MouseEvent) => {
        const result = onDrag({
          clientX: event.clientX,
          clientY: event.clientY,
          offsetX: event.pageX - targetRect.left,
          offsetY: event.pageY - targetRect.top,
          pageX: event.pageX,
          pageY: event.pageY,
          screenX: event.pageX,
          screenY: event.pageY,
        });
  
        if (result) {
          setTargetRect(null);
          setStartData(null);
        }
      };
      const touchend = ({ touches }: TouchEvent) => {
        const item = touches.item(0)
        
        if (item) {
          const result = onDrag({
            clientX: item.clientX,
            clientY: item.clientY,
            offsetX: item.pageX - targetRect.left,
            offsetY: item.pageY - targetRect.top,
            pageX: item.pageX,
            pageY: item.pageY,
            screenX: item.pageX,
            screenY: item.pageY,
          });

          if (result) {
            setTargetRect(null);
            setStartData(null);
          }
        } else {
          setTargetRect(null);
          setStartData(null);
        }
      };
      document.addEventListener('mouseup', mouseend);
      document.addEventListener('touchend', touchend);
      document.addEventListener('touchcancel', touchend);
  
      return () => {
        document.removeEventListener('mouseup', mouseend);
        document.removeEventListener('touchend', touchend);
        document.removeEventListener('touchcancel', touchend);
      }
    }
  }, [onDrag, targetRect]);

  useEffect(() => {
    if (targetRect) {
      const mousemove = (event: MouseEvent) => {
        onDrag({
          clientX: event.clientX,
          clientY: event.clientY,
          offsetX: event.pageX - targetRect.left,
          offsetY: event.pageY - targetRect.top,
          pageX: event.pageX,
          pageY: event.pageY,
          screenX: event.pageX,
          screenY: event.pageY,
        });
      };
      const touchmove = ({ touches }: TouchEvent) => {
        const item = touches.item(0)
        
        if (item) {
          onDrag({
            clientX: item.clientX,
            clientY: item.clientY,
            offsetX: item.pageX - targetRect.left,
            offsetY: item.pageY - targetRect.top,
            pageX: item.pageX,
            pageY: item.pageY,
            screenX: item.pageX,
            screenY: item.pageY,
          });
        }
      };
  
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('touchmove', touchmove);
  
      return () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('touchmove', touchmove);
      }
    }
  }, [onDrag, targetRect]);

  
  const onMouseDown: React.MouseEventHandler<Element> = useCallback(({ clientX, clientY, currentTarget }) => {
    setTargetRect(currentTarget.getBoundingClientRect());
    setStartData({ x: clientX, y: clientY });
  }, []);

  const onTouchStart: React.TouchEventHandler<Element> = useCallback(({ touches, currentTarget }) => {
    const { clientX, clientY } = touches.item(0);

    setTargetRect(currentTarget.getBoundingClientRect());
    setStartData({ x: clientX, y: clientY });
  }, []);

  return {
    onMouseDown,
    onTouchStart,
  }
};

export default useDragEvent;
