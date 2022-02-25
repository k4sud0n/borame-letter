import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface ModalProps {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  positive?: string;
  negative?: string;
  onButtonClick?: (type: 'positive' | 'negative') => void;
  onClose?: () => void;
}

const Modal = ({
  title,
  children,
  open,
  positive,
  negative,
  onButtonClick,
  onClose,
}: ModalProps): JSX.Element => {
  return (
    <CSSTransition
      in={open}
      classNames={'fade'}
      timeout={250}
      unmountOnExit
      mountOnEnter
    >
      <div
        className={'fixed inset-0 bg-slate-500 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center p-6'}
        onClick={() => onClose?.()}
      >
        <div
          className={'max-w-[360px] w-fit h-auto bg-slate-100 rounded-xl flex flex-col gap-4 shadow-xl'}
          onClick={(event) => event.stopPropagation()}
        >
          {title && <div className={'text-lg font-semibold text-black p-6 pb-0'}>{title}</div>}
          <div className={'grow px-6 max-h-96 overflow-y-auto whitespace-pre-wrap'}>{children}</div>
          {(positive || negative) && (
            <div className={'flex flex-row justify-end items-center px-6 pb-6 gap-3'}>
              {positive && (
                <div
                  className={'rounded-full bg-slate-300 px-4 py-1 cursor-pointer hover:bg-slate-400 active:scale-95 transition-all'}
                  onClick={() => onButtonClick?.('positive')}
                >
                  {positive}
                </div>)
              }
              {negative && (
                <div
                  className={'rounded-full bg-slate-300 px-4 py-1 cursor-pointer hover:bg-slate-400 active:scale-95 transition-all'}
                  onClick={() => onButtonClick?.('negative')}
                >
                  {negative}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default Modal;
