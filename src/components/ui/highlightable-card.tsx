import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HighlightableCardProps {
  children: React.ReactNode;
  itemId: string;
  isHighlighted: boolean;
  className?: string;
}

export const HighlightableCard: React.FC<HighlightableCardProps> = ({
  children,
  itemId,
  isHighlighted,
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      // Add a slight delay to ensure the element is rendered
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isHighlighted]);

  return (
    <div
      ref={cardRef}
      data-item-id={itemId}
      className={cn(
        'transition-all duration-300',
        isHighlighted && 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  );
};
