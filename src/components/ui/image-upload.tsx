import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Upload,
  X,
  Image as ImageIcon,
  FileImage,
  Loader2
} from 'lucide-react';
import { useImageUpload, UploadedImage } from '@/hooks/useImageUpload';

interface ImageUploadProps {
  onImagesChange?: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  className?: string;
  disabled?: boolean;
  initialImages?: UploadedImage[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxFiles = 5,
  maxFileSize = 10,
  className,
  disabled = false,
  initialImages = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    uploadedImages,
    isUploading,
    uploadFiles,
    removeImage,
    clearImages,
    canUploadMore,
    remainingSlots
  } = useImageUpload({
    maxFiles,
    maxFileSize,
    onUpload: onImagesChange
  });

  // Initialize with initial images if provided
  React.useEffect(() => {
    if (initialImages.length > 0 && uploadedImages.length === 0) {
      // This would need to be handled differently in a real app
      // For now, we'll just trigger the callback
      onImagesChange?.(initialImages);
    }
  }, [initialImages, uploadedImages.length, onImagesChange]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || !canUploadMore) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (disabled || !canUploadMore) return;
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
          dragActive && !disabled && canUploadMore
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          disabled && 'opacity-50 cursor-not-allowed',
          !canUploadMore && 'opacity-50 cursor-not-allowed'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || !canUploadMore}
        />

        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {canUploadMore
                  ? 'Click to upload or drag and drop'
                  : `Maximum ${maxFiles} images reached`
                }
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to {maxFileSize}MB
                {canUploadMore && ` (${remainingSlots} slots remaining)`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Uploaded Images ({uploadedImages.length}/{maxFiles})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={clearImages}
              disabled={disabled}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {uploadedImages.map((image, index) => (
              <Card key={image.id} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Main image badge */}
                    {index === 0 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 left-2 text-xs bg-primary text-primary-foreground"
                      >
                        Main
                      </Badge>
                    )}

                    {/* Remove button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      disabled={disabled}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    {/* Image info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs truncate">{image.name}</p>
                      <p className="text-xs text-gray-300">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
