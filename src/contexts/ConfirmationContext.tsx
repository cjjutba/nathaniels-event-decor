import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConfirmationModal, ConfirmationType } from '@/components/ui/confirmation-modal';

interface ConfirmationOptions {
  type: ConfirmationType;
  title?: string;
  description?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
  isLoading: boolean;
}

interface ConfirmationProviderProps {
  children: ReactNode;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({
    type: 'general'
  });
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = (confirmationOptions: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(confirmationOptions);
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));

    setIsLoading(false);
    setIsOpen(false);

    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
  };

  const value: ConfirmationContextType = {
    confirm,
    isLoading
  };

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        type={options.type}
        title={options.title}
        description={options.description}
        itemName={options.itemName}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={isLoading}
      />
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};

// Convenience hooks for common confirmation types
export const useDeleteConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (itemName: string, customDescription?: string) => {
    return confirm({
      type: 'delete',
      itemName,
      description: customDescription
    });
  };
};

export const useStatusChangeConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (itemName: string, newStatus: string, customDescription?: string) => {
    return confirm({
      type: 'status-change',
      itemName,
      description: customDescription || `Are you sure you want to change the status of "${itemName}" to "${newStatus}"?`
    });
  };
};

export const useResetConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (customDescription?: string) => {
    return confirm({
      type: 'reset',
      description: customDescription
    });
  };
};

export const useSecurityConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (action: string, customDescription?: string) => {
    return confirm({
      type: 'security',
      title: `Confirm ${action}`,
      description: customDescription || `Are you sure you want to ${action.toLowerCase()}? This is a security-sensitive action.`
    });
  };
};

export const useArchiveConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (itemName: string, customDescription?: string) => {
    return confirm({
      type: 'archive',
      itemName,
      description: customDescription
    });
  };
};

export const useFeatureConfirmation = () => {
  const { confirm } = useConfirmation();
  
  return (itemName: string, isCurrentlyFeatured: boolean, customDescription?: string) => {
    return confirm({
      type: 'feature',
      title: isCurrentlyFeatured ? `Remove from Featured` : `Add to Featured`,
      itemName,
      confirmText: isCurrentlyFeatured ? 'Remove' : 'Feature Item',
      description: customDescription || (
        isCurrentlyFeatured 
          ? `Are you sure you want to remove "${itemName}" from featured items?`
          : `Are you sure you want to feature "${itemName}"? It will be highlighted and given priority visibility.`
      )
    });
  };
};
