import { useState } from 'react';
import { Friend } from '../../types/friend';
import { UserProfileModal } from '../Profile/UserProfileModal';
import { UserLevel } from '../UserLevel/UserLevel';
import clsx from 'clsx';

interface FriendItemProps {
  friend: Friend;
}

export const FriendItem = ({ friend }: FriendItemProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  return (
    <>
      <div 
        className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="relative">
          <div className="text-2xl mr-3">{friend.avatar}</div>
          <span 
            className={clsx(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
              friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            )}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <UserLevel userId={friend.id} size="sm" />
            <h3 className="font-semibold text-gray-900">{friend.name}</h3>
          </div>
        </div>
      </div>

      <UserProfileModal
        user={{
          id: friend.id,
          name: friend.name,
          email: '',
          avatar: friend.avatar,
          userId: friend.id,
          status: friend.status,
          bio: 'مستخدم تطبيق المحادثات'
        }}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};