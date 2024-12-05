import { Friend } from '../../types/friend';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { FriendItem } from './FriendItem';

interface FriendsListProps {
  title: string;
  friends: Friend[];
  emptyMessage: string;
  type: 'online' | 'offline';
}

export const FriendsList = ({ title, friends, emptyMessage, type }: FriendsListProps) => {
  return (
    <div>
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${type === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
          {title}
          <span className="text-sm text-gray-500 font-normal">({friends.length})</span>
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {friends.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <UserGroupIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-base">{emptyMessage}</p>
          </div>
        ) : (
          friends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))
        )}
      </div>
    </div>
  );
};