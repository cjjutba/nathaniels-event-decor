import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchResult } from '@/lib/searchUtils';
import { PATHS } from '@/lib/constants';
import {
  CalendarDays,
  Package,
  Users,
  ClipboardList,
  GalleryHorizontal,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

interface SearchResultCardProps {
  result: SearchResult;
  navigate: (path: string) => void;
  onClose?: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  result,
  navigate,
  onClose
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return CalendarDays;
      case 'service':
        return Package;
      case 'client':
        return Users;
      case 'inquiry':
        return ClipboardList;
      case 'portfolio':
        return GalleryHorizontal;
      default:
        return Eye;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'service':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'client':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'inquiry':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'portfolio':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusBadge = (type: string, status: string) => {
    const statusConfig = {
      event: {
        confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        planning: { color: 'bg-blue-100 text-blue-800', icon: Clock },
        'in-progress': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
      },
      service: {
        active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        inactive: { color: 'bg-gray-100 text-gray-800', icon: Clock },
        draft: { color: 'bg-yellow-100 text-yellow-800', icon: Edit }
      },
      client: {
        active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        inactive: { color: 'bg-gray-100 text-gray-800', icon: Clock },
        pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        vip: { color: 'bg-purple-100 text-purple-800', icon: Star }
      },
      inquiry: {
        new: { color: 'bg-blue-100 text-blue-800', icon: Clock },
        'in-progress': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        responded: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        converted: { color: 'bg-purple-100 text-purple-800', icon: Star },
        archived: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
      },
      portfolio: {
        published: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        draft: { color: 'bg-yellow-100 text-yellow-800', icon: Edit },
        archived: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
      }
    };

    const config = statusConfig[type as keyof typeof statusConfig]?.[status as keyof any];
    if (!config) return null;

    const StatusIcon = config.icon;
    return (
      <Badge variant="secondary" className={`${config.color} text-xs`}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getNavigationPath = (type: string) => {
    switch (type) {
      case 'event':
        return PATHS.ADMIN_EVENTS;
      case 'service':
        return PATHS.ADMIN_SERVICES;
      case 'client':
        return PATHS.ADMIN_CLIENTS;
      case 'inquiry':
        return PATHS.ADMIN_INQUIRIES;
      case 'portfolio':
        return PATHS.ADMIN_PORTFOLIO;
      default:
        return PATHS.ADMIN_DASHBOARD;
    }
  };

  const handleNavigate = () => {
    const path = getNavigationPath(result.type);
    navigate(path);
    onClose?.();
  };

  const TypeIcon = getTypeIcon(result.type);

  const renderMetadata = () => {
    switch (result.type) {
      case 'event':
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {result.metadata.eventDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {new Date(result.metadata.eventDate).toLocaleDateString()}
              </div>
            )}
            {result.metadata.budget && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {result.metadata.budget}
              </div>
            )}
            {result.metadata.clientPhone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {result.metadata.clientPhone}
              </div>
            )}
          </div>
        );

      case 'service':
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {result.metadata.basePrice && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {result.metadata.basePrice}
              </div>
            )}
            {result.metadata.averageRating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {result.metadata.averageRating}/5
              </div>
            )}
          </div>
        );

      case 'client':
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {result.metadata.totalEvents && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {result.metadata.totalEvents} events
              </div>
            )}
            {result.metadata.totalSpent && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {result.metadata.totalSpent}
              </div>
            )}
            {result.metadata.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {result.metadata.phone}
              </div>
            )}
          </div>
        );

      case 'inquiry':
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {result.metadata.eventDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {new Date(result.metadata.eventDate).toLocaleDateString()}
              </div>
            )}
            {result.metadata.budget && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {result.metadata.budget}
              </div>
            )}
            {result.metadata.submittedAt && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(result.metadata.submittedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        );

      case 'portfolio':
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {result.metadata.eventDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {new Date(result.metadata.eventDate).toLocaleDateString()}
              </div>
            )}
            {result.metadata.views && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {result.metadata.views} views
              </div>
            )}
            {result.metadata.likes && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {result.metadata.likes} likes
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-sm transition-all duration-200 cursor-pointer group border-l-2 border-l-transparent hover:border-l-primary" onClick={handleNavigate}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${getTypeColor(result.type)}`}>
              <TypeIcon className="h-3 w-3" />
            </div>
            <Badge variant="outline" className="text-xs capitalize h-5 px-2">
              {result.type}
            </Badge>
            {result.metadata.status && getStatusBadge(result.type, result.metadata.status)}
          </div>
          <div className="text-xs text-muted-foreground">
            {result.score.toFixed(1)}
          </div>
        </div>

        <div className="space-y-1">
          <h3
            className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1"
            dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
          />

          <p
            className="text-xs text-muted-foreground line-clamp-2"
            dangerouslySetInnerHTML={{ __html: result.highlightedDescription }}
          />

          {renderMetadata()}
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            Click to view in {result.type} management
          </div>
          <Button variant="ghost" size="sm" className="h-5 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
