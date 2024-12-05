import { useState } from 'react';
import { Chat } from '../../types/chat';
import { UserProfileModal } from '../Profile/UserProfileModal';
import { UserLevel } from '../UserLevel/UserLevel';
import { getRoomLevel } from '../../utils/roomLevels';
import clsx from 'clsx';
import { UsersIcon, UserPlusIcon, NoSymbolIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
  onClick: () => void;
}

export const ChatListItem = ({ chat, isActive, onClick }: ChatListItemProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const level = chat.type === 'room' ? getRoomLevel(chat.roomId || chat.id) : null;

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chat.type === 'private') {
      setIsProfileOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className={clsx(
          'flex items-center p-4 cursor-pointer transition-all duration-200',
          'hover:bg-gray-50 active:bg-gray-100',
          'transform hover:scale-[1.01]',
          isActive && 'bg-blue-50 hover:bg-blue-100'
        )}
      >
        <div className="relative">
          <div 
            className="text-2xl sm:text-3xl ml-4 cursor-pointer"
            onClick={handleProfileClick}
          >
            {chat.avatar}
          </div>
          {chat.type === 'room' && (
            <span className="absolute -top-1 -right-1">
              <UsersIcon className="w-4 h-4 text-gray-600" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {chat.type === 'private' && <UserLevel userId={chat.id} size="sm" />}
            {chat.type === 'room' && level && (
              <span className={`${level.color.bg} ${level.color.text} px-2 py-0.5 text-xs font-medium rounded-full ring-1 ${level.color.ring}`}>
                {level.name}
              </span>
            )}
            <h3 
              className="font-semibold text-gray-900 truncate cursor-pointer"
              onClick={handleProfileClick}
            >
              {chat.name}
            </h3>
            {chat.unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full transform hover:scale-110 transition-transform">
                {chat.unreadCount}
              </span>
            )}
          </div>
          {chat.lastMessage && (
            <p className="text-sm text-gray-500 truncate mt-1 leading-relaxed">
              {chat.lastMessage}
            </p>
          )}
        </div>
      </div>

      {chat.type === 'private' && (
        <UserProfileModal
          user={{
            id: chat.id,
            name: chat.name,
            email: '',
            avatar: chat.avatar,
            userId: chat.id,
            status: 'online',
            bio: 'مستخدم تطبيق المحادثات'
          }}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          actionButtons={
            <div className="flex gap-2 mt-4 justify-center">
              <button
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="إضافة صديق"
              >
                <UserPlusIcon className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="حظر المستخدم"
              >
                <NoSymbolIcon className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                title="إبلاغ"
              >
                <ShieldExclamationIcon className="w-5 h-5" />
              </button>
            </div>
          }
        />
      )}
    </>
  );
};