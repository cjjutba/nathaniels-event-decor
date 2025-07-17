import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Heart } from 'lucide-react';

interface GlobalLoadingProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  isVisible,
  message = "Loading...",
  className
}) => {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center space-y-6 p-8 rounded-lg bg-card border shadow-lg">
        {/* Logo/Brand Section */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Heart className="h-8 w-8 text-primary fill-current" />
            <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="text-xl font-bold text-foreground">
            Nathaniel's Event & Decor
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
          
          {/* Inner decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
        </div>

        {/* Decorative dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

// Simplified version for inline use
export const InlineLoading: React.FC<{ message?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  message = "Loading...",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center space-x-3 p-4">
      <div className={cn(
        "border-2 border-muted rounded-full animate-spin border-t-primary",
        sizeClasses[size]
      )}></div>
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
};
