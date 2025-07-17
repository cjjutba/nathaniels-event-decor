import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  RefreshCw, 
  Shield, 
  Heart,
  Sparkles 
} from 'lucide-react';

export type ConfirmationType = 
  | 'delete' 
  | 'edit' 
  | 'status-change' 
  | 'reset' 
  | 'security' 
  | 'archive'
  | 'feature'
  | 'general';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: ConfirmationType;
  title?: string;
  description?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const getConfirmationConfig = (type: ConfirmationType, itemName?: string) => {
  const configs = {
    delete: {
      icon: Trash2,
      iconColor: 'text-destructive',
      iconBg: 'bg-destructive/10',
      title: `Delete ${itemName || 'Item'}`,
      description: `Are you sure you want to delete "${itemName || 'this item'}"? This action cannot be undone and will permanently remove all associated data.`,
      confirmText: 'Delete',
      confirmVariant: 'destructive' as const,
      cancelText: 'Cancel'
    },
    edit: {
      icon: Edit,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      title: `Edit ${itemName || 'Item'}`,
      description: `Are you sure you want to edit "${itemName || 'this item'}"? Any unsaved changes will be lost.`,
      confirmText: 'Continue Editing',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    },
    'status-change': {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: `Update Status`,
      description: `Are you sure you want to change the status of "${itemName || 'this item'}"? This will affect its visibility and availability.`,
      confirmText: 'Update Status',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    },
    reset: {
      icon: RefreshCw,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      title: 'Reset to Defaults',
      description: 'Are you sure you want to reset all settings to their default values? This will undo all your customizations and cannot be undone.',
      confirmText: 'Reset Settings',
      confirmVariant: 'destructive' as const,
      cancelText: 'Cancel'
    },
    security: {
      icon: Shield,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      title: 'Security Action',
      description: 'This is a security-sensitive action. Please confirm that you want to proceed with this change.',
      confirmText: 'Confirm',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    },
    archive: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      title: `Archive ${itemName || 'Item'}`,
      description: `Are you sure you want to archive "${itemName || 'this item'}"? It will be moved to the archive and won't be visible in the main list.`,
      confirmText: 'Archive',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    },
    feature: {
      icon: Sparkles,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      title: `Feature ${itemName || 'Item'}`,
      description: `Are you sure you want to feature "${itemName || 'this item'}"? It will be highlighted and given priority visibility.`,
      confirmText: 'Feature Item',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    },
    general: {
      icon: AlertTriangle,
      iconColor: 'text-muted-foreground',
      iconBg: 'bg-muted',
      title: 'Confirm Action',
      description: 'Are you sure you want to proceed with this action?',
      confirmText: 'Confirm',
      confirmVariant: 'default' as const,
      cancelText: 'Cancel'
    }
  };

  return configs[type];
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  description,
  itemName,
  confirmText,
  cancelText,
  isLoading = false
}) => {
  const config = getConfirmationConfig(type, itemName);
  const Icon = config.icon;

  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalConfirmText = confirmText || config.confirmText;
  const finalCancelText = cancelText || config.cancelText;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          {/* Brand Header */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Heart className="h-6 w-6 text-primary fill-current" />
              <Sparkles className="h-3 w-3 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              Nathaniel's Event & Decor
            </span>
          </div>

          {/* Action Icon */}
          <div className="flex justify-center mb-4">
            <div className={cn(
              "p-3 rounded-full",
              config.iconBg
            )}>
              <Icon className={cn("h-6 w-6", config.iconColor)} />
            </div>
          </div>

          <AlertDialogTitle className="text-xl font-semibold">
            {finalTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            {finalDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {finalCancelText}
            </Button>
          </AlertDialogCancel>
          <Button
            variant={config.confirmVariant}
            className="w-full sm:w-auto"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              finalConfirmText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
