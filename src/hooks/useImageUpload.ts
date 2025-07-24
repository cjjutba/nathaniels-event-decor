import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
}

interface UseImageUploadOptions {
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  onUpload?: (images: UploadedImage[]) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const {
    maxFiles = 5,
    maxFileSize = 10,
    acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    onUpload
  } = options;

  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size (${fileSizeMB.toFixed(2)}MB) exceeds the maximum limit of ${maxFileSize}MB`;
    }

    return null;
  }, [acceptedTypes, maxFileSize]);

  const createImageUrl = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Check if adding these files would exceed the max limit
    if (uploadedImages.length + fileArray.length > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `You can only upload up to ${maxFiles} files. Currently have ${uploadedImages.length} files.`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const newImages: UploadedImage[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          toast({
            title: "Invalid File",
            description: validationError,
            variant: "destructive"
          });
          continue;
        }

        try {
          const url = await createImageUrl(file);
          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            url,
            name: file.name,
            size: file.size,
            type: file.type
          };
          newImages.push(uploadedImage);
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to process ${file.name}`,
            variant: "destructive"
          });
        }
      }

      if (newImages.length > 0) {
        const updatedImages = [...uploadedImages, ...newImages];
        setUploadedImages(updatedImages);
        onUpload?.(updatedImages);

        toast({
          title: "Upload Successful",
          description: `Successfully uploaded ${newImages.length} image${newImages.length > 1 ? 's' : ''}`,
        });
      }
    } finally {
      setIsUploading(false);
    }
  }, [uploadedImages, maxFiles, validateFile, createImageUrl, onUpload, toast]);

  const removeImage = useCallback((imageId: string) => {
    const updatedImages = uploadedImages.filter(img => img.id !== imageId);
    setUploadedImages(updatedImages);
    onUpload?.(updatedImages);
  }, [uploadedImages, onUpload]);

  const clearImages = useCallback(() => {
    setUploadedImages([]);
    onUpload?.([]);
  }, [onUpload]);

  const getMainImage = useCallback((): UploadedImage | null => {
    return uploadedImages.length > 0 ? uploadedImages[0] : null;
  }, [uploadedImages]);

  return {
    uploadedImages,
    isUploading,
    uploadFiles,
    removeImage,
    clearImages,
    getMainImage,
    canUploadMore: uploadedImages.length < maxFiles,
    remainingSlots: maxFiles - uploadedImages.length
  };
}
