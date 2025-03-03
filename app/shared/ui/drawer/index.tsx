import { useEffect, useRef, useState } from 'react';
import { Backdrop, DrawerContent, DrawerWrapper, Handle } from './styles';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  height = '60%',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  // Закрытие при нажатии вне области
  const handleClickOutside = (e: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Обработка свайпа вниз
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current !== null) {
      const diffY = e.touches[0].clientY - startY.current;
      if (diffY > 50) setIsDragging(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDragging) {
      onClose();
    }
    setIsDragging(false);
    startY.current = null;
  };

  return (
    <>
      {open && <Backdrop onClick={onClose} />}
      <DrawerWrapper
        ref={drawerRef}
        open={open}
        height={height}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Handle />
        <DrawerContent>{children}</DrawerContent>
      </DrawerWrapper>
    </>
  );
};

export default Drawer;
