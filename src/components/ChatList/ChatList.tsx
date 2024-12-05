import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatListItem } from './ChatListItem';
import { ChatTabs } from './ChatTabs';
import { mockChats } from '../../data/mockData';
import { ChatType } from '../../types/chat';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export const ChatList = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ChatType>('general');
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    navigate(`/chat/${chatId}`);
  };

  const filteredChats = mockChats.filter(chat => chat.type === selectedType);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <ChatTabs selectedType={selectedType} onTypeChange={setSelectedType} />
      </div>
      
      <div className="divide-y divide-gray-100">
        {filteredChats.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg">لا توجد محادثات في هذا القسم</p>
            <p className="text-sm text-gray-400 mt-2">ابدأ محادثة جديدة الآن</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={activeChat === chat.id}
              onClick={() => handleChatClick(chat.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};