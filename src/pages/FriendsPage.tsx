import { useState, useMemo } from 'react';
import { mockFriends } from '../data/mockData';
import { FriendsList } from '../components/Friends/FriendsList';
import { SearchBar } from '../components/Friends/SearchBar';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(() => {
    return mockFriends.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const onlineFriends = filteredFriends.filter(friend => friend.status === 'online');
  const offlineFriends = filteredFriends.filter(friend => friend.status === 'offline');

  const handleAddFriend = () => {
    // Add friend logic here
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-end items-center gap-2">
        <button
          onClick={handleAddFriend}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="إضافة صديق"
        >
          <UserPlusIcon className="h-6 w-6 text-gray-500" />
        </button>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="ابحث عن صديق..."
        />
      </div>

      <div className="divide-y divide-gray-200">
        <div>
          <FriendsList
            title="متصل"
            friends={onlineFriends}
            emptyMessage="لا يوجد أصدقاء متصلين حالياً"
            type="online"
          />
        </div>

        <div>
          <FriendsList
            title="غير متصل"
            friends={offlineFriends}
            emptyMessage="لا يوجد أصدقاء غير متصلين"
            type="offline"
          />
        </div>
      </div>
    </div>
  );
};