import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useChatStore } from '../../store/chatStore';
import { Message } from '../../types/chat';
import { useAuthStore } from '../../store/authStore';
import { EmojiPicker } from 'emoji-picker-react';
import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export const ChatRoom = () => {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const socket = useSocket();
  const user = useAuthStore((state) => state.user);
  const messages = useChatStore((state) => state.messages[chatId || ''] || []);
  const addMessage = useChatStore((state) => state.addMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      socket.emit('join_chat', { chatId });
      return () => {
        socket.emit('leave_chat', { chatId });
      };
    }
  }, [chatId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && chatId && user) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: user.id,
        chatId,
        timestamp: new Date(),
      };

      socket.emit('send_message', newMessage);
      addMessage(chatId, newMessage);
      setMessage('');
      setShowEmoji(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.sender === user?.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              <span className="text-xs opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك..."
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-12 pr-4 py-2 resize-none"
            rows={1}
          />
          <div className="absolute left-2 bottom-2 flex items-center space-x-2">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaceSmileIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
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
    </div>
  );
};