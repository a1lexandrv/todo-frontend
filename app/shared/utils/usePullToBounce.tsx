import { useRef, useState } from 'react';

export const usePullToBounce = (
  scrollRef: React.RefObject<HTMLDivElement>,
  limit = 50,
  duration = 300,
) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;

    if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
      setOffset(Math.max(-limit, Math.min(limit, deltaY / 2)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setOffset(0);
  };

  return {
    offset,
    isDragging,
    transition: isDragging ? 'none' : `transform ${duration}ms ease-out`,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
