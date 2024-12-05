import { useState } from 'react';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { EmojiPicker } from 'emoji-picker-react';

interface ChatInputProps {
  onSendMessage: (content: string, files?: File[]) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
      setShowEmoji(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 bg-white">
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب رسالتك..."
          className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-24 pr-4 py-2 resize-none"
          rows={1}
        />
        <div className="absolute left-2 bottom-2 flex items-center space-x-2">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          >
            <PhotoIcon className="w-6 h-6" />
          </label>
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            😊
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() && files.length === 0}
            className="text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {showEmoji && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker
            onEmojiClick={(emoji) => {
              setMessage((prev) => prev + emoji.emoji);
            }}
          />
        </div>
      )}
    </div>
  );
};