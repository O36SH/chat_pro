import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImagePreviewProps {
  image: string;
  onRemove: () => void;
}

export const ImagePreview = ({ image, onRemove }: ImagePreviewProps) => {
  return (
    <div className="relative group">
      <img
        src={image}
        alt="صورة المنشور"
        className="w-full h-32 object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};