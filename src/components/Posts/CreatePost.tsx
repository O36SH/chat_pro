import { useState, ChangeEvent } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ImagePreview } from './ImagePreview';

interface CreatePostProps {
  onCreatePost: (content: string, images: string[]) => void;
}

export const CreatePost = ({ onCreatePost }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleSubmit = () => {
    if (content.trim() || images.length > 0) {
      onCreatePost(content, images);
      setContent('');
      setImages([]);
      setIsExpanded(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-reverse space-x-3">
        <div className="text-2xl">👤</div>
        <div className="flex-1">
          <textarea
            placeholder="ماذا يدور في ذهنك؟"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="w-full resize-none border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            rows={isExpanded ? 3 : 1}
          />
          
          <div
            className={`mt-3 rounded-lg transition-all ${
              isDragging ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <ImagePreview
                    key={index}
                    image={image}
                    onRemove={() => removeImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="mt-3 flex items-center justify-between border-t pt-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <label className="cursor-pointer rounded-full p-2 hover:bg-gray-100 transition-colors">
                  <PhotoIcon className="w-6 h-6 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    multiple
                  />
                </label>
                <span className="text-sm text-gray-500">
                  اسحب وأفلت الصور هنا أو انقر للاختيار
                </span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() && images.length === 0}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                نشر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};