import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HighlightableCardProps {
  children: ReactNode;
  itemId: string;
  isHighlighted: boolean;
  className?: string;
}

/**
 * Wrapper component that adds highlighting functionality to any card
 * Applies highlight styles and data attributes for scroll targeting
 */
export const HighlightableCard: React.FC<HighlightableCardProps> = ({
  children,
  itemId,
  isHighlighted,
  className
}) => {
  return (
    <div
      data-item-id={itemId}
      className={cn(
        'transition-all duration-500 ease-in-out',
        isHighlighted && [
          'ring-2 ring-primary ring-offset-2',
          'shadow-lg shadow-primary/20',
          'scale-[1.02]',
          'animate-pulse-highlight'
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Higher-order component version for easier wrapping
 */
export const withHighlight = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<any, P & { itemId: string; isHighlighted: boolean; className?: string }>(
    ({ itemId, isHighlighted, className, ...props }, ref) => (
      <HighlightableCard
        itemId={itemId}
        isHighlighted={isHighlighted}
        className={className}
      >
        <Component {...(props as P)} ref={ref} />
      </HighlightableCard>
    )
  );
};
