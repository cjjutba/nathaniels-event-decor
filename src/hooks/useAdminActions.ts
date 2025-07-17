import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  useDeleteConfirmation, 
  useStatusChangeConfirmation, 
  useArchiveConfirmation,
  useFeatureConfirmation,
  useResetConfirmation,
  useSecurityConfirmation
} from '@/contexts/ConfirmationContext';

export interface AdminActionsConfig {
  entityName: string; // e.g., "event", "client", "service"
  entityDisplayName?: string; // e.g., "Event", "Client", "Service"
}

export const useAdminActions = (config: AdminActionsConfig) => {
  const { toast } = useToast();
  const confirmDelete = useDeleteConfirmation();
  const confirmStatusChange = useStatusChangeConfirmation();
  const confirmArchive = useArchiveConfirmation();
  const confirmFeature = useFeatureConfirmation();
  const confirmReset = useResetConfirmation();
  const confirmSecurity = useSecurityConfirmation();

  const entityDisplayName = config.entityDisplayName || config.entityName;

  // Delete action with confirmation
  const handleDelete = async (
    id: string,
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    getItemName: (item: any) => string
  ) => {
    const item = items.find(i => i.id === id);
    if (!item) return false;

    const itemName = getItemName(item);
    const confirmed = await confirmDelete(itemName);
    if (!confirmed) return false;

    setItems(prev => prev.filter(i => i.id !== id));

    toast({
      title: `${entityDisplayName} Deleted`,
      description: `"${itemName}" has been deleted successfully`,
    });

    return true;
  };

  // Status change action with confirmation
  const handleStatusChange = async (
    id: string,
    newStatus: string,
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    getItemName: (item: any) => string
  ) => {
    const item = items.find(i => i.id === id);
    if (!item) return false;

    const itemName = getItemName(item);

    // Special handling for archive status
    let confirmed;
    if (newStatus === 'archived') {
      confirmed = await confirmArchive(itemName);
    } else {
      confirmed = await confirmStatusChange(itemName, newStatus);
    }

    if (!confirmed) return false;

    setItems(prev => prev.map(i =>
      i.id === id
        ? { ...i, status: newStatus, lastUpdated: new Date().toISOString() }
        : i
    ));

    toast({
      title: "Status Updated",
      description: `${itemName} status changed to ${newStatus}`,
    });

    return true;
  };

  // Feature toggle action with confirmation
  const handleFeatureToggle = async (
    id: string,
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    getItemName: (item: any) => string
  ) => {
    const item = items.find(i => i.id === id);
    if (!item) return false;

    const itemName = getItemName(item);
    const isCurrentlyFeatured = item.featured || false;

    const confirmed = await confirmFeature(itemName, isCurrentlyFeatured);
    if (!confirmed) return false;

    setItems(prev => prev.map(i =>
      i.id === id
        ? { ...i, featured: !isCurrentlyFeatured, lastUpdated: new Date().toISOString() }
        : i
    ));

    toast({
      title: isCurrentlyFeatured ? "Removed from Featured" : "Added to Featured",
      description: `"${itemName}" ${isCurrentlyFeatured ? 'removed from' : 'added to'} featured items`,
    });

    return true;
  };

  // Reset settings action with confirmation
  const handleReset = async (
    resetAction: () => void,
    customDescription?: string
  ) => {
    const confirmed = await confirmReset(customDescription);
    if (!confirmed) return false;

    resetAction();

    toast({
      title: "Settings Reset",
      description: "All settings have been reset to their default values",
    });

    return true;
  };

  // Security action with confirmation (e.g., password change)
  const handleSecurityAction = async (
    action: string,
    securityAction: () => void,
    customDescription?: string
  ) => {
    const confirmed = await confirmSecurity(action, customDescription);
    if (!confirmed) return false;

    securityAction();

    toast({
      title: `${action} Successful`,
      description: `${action} has been completed successfully`,
    });

    return true;
  };

  // Bulk actions with confirmation
  const handleBulkDelete = async (
    selectedIds: string[],
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    getItemName: (item: any) => string
  ) => {
    if (selectedIds.length === 0) return false;

    const itemNames = selectedIds
      .map(id => items.find(i => i.id === id))
      .filter(Boolean)
      .map(getItemName);

    const confirmed = await confirmDelete(
      `${selectedIds.length} ${entityDisplayName.toLowerCase()}${selectedIds.length > 1 ? 's' : ''}`,
      `Are you sure you want to delete ${selectedIds.length} ${entityDisplayName.toLowerCase()}${selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.\n\nItems to be deleted:\n${itemNames.join(', ')}`
    );

    if (!confirmed) return false;

    setItems(prev => prev.filter(i => !selectedIds.includes(i.id)));

    toast({
      title: `${entityDisplayName}s Deleted`,
      description: `${selectedIds.length} ${entityDisplayName.toLowerCase()}${selectedIds.length > 1 ? 's have' : ' has'} been deleted successfully`,
    });

    return true;
  };

  return {
    handleDelete,
    handleStatusChange,
    handleFeatureToggle,
    handleReset,
    handleSecurityAction,
    handleBulkDelete,
    // Direct access to confirmation functions for custom use
    confirmDelete,
    confirmStatusChange,
    confirmArchive,
    confirmFeature,
    confirmReset,
    confirmSecurity
  };
};
