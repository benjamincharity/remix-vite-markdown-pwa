import { useReducedMotion } from '@mantine/hooks';
import React, { HTMLAttributes } from 'react';

interface BackToTopProps extends HTMLAttributes<HTMLButtonElement> {
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export function BackToTop(props: BackToTopProps) {
  const { wrapperProps, ...buttonProps } = props;
  const { className = '', ...wrapperPropsFinal } = wrapperProps ?? {};
  const reduceMotion = useReducedMotion();
  const scrollToTop = (event: React.MouseEvent) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={`text-right ${className}`} {...wrapperPropsFinal}>
      <button
        className={'animated-link-underline mb-4 text-sm font-normal leading-6'}
        onClick={scrollToTop}
        {...buttonProps}
      >
        Back to top &uarr;
      </button>
    </div>
  );
}
