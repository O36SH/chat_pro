import { ChangeEvent, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface AvatarUploadProps {
  currentAvatar: string;
  isEditing: boolean;
  onAvatarChange: (avatar: string) => void;
  status: string;
}

export const AvatarUpload = ({ currentAvatar, isEditing, onAvatarChange, status }: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onAvatarChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
        {previewUrl ? (
          <img src={previewUrl} alt="الصورة الشخصية" className="w-full h-full object-cover" />
        ) : (
          <div className="text-4xl">{currentAvatar}</div>
        )}
        
        {isEditing && (
          <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <PhotoIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </label>
        )}
      </div>
      
      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
        status === 'online' ? 'bg-green-500' :
        status === 'away' ? 'bg-yellow-500' :
        status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
      }`} />
    </div>
  );
};