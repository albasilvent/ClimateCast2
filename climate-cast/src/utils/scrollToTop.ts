import { RefObject } from 'react';

const scrollToTop = (scrollAreaRef: RefObject<HTMLDivElement>) => {
  if (scrollAreaRef.current) {
    scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export default scrollToTop;
