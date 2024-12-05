import { mockRooms } from '../data/mockData';
import { RoomCard } from '../components/Rooms/RoomCard';
import { MagnifyingGlassIcon, SparklesIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '../components/Friends/SearchBar';
import { useState } from 'react';

export const RoomsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleDiscoverRooms = () => {
    // اكتشاف الغرف
  };

  const handleCreateRoom = () => {
    // إنشاء غرفة جديدة
  };

  const filteredRooms = mockRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-100">
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={handleCreateRoom}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="إنشاء غرفة"
          >
            <PlusCircleIcon className="h-6 w-6 text-gray-500" />
          </button>
          <button
            onClick={handleDiscoverRooms}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="اكتشاف الغرف"
          >
            <SparklesIcon className="h-6 w-6 text-gray-500" />
          </button>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="ابحث عن غرفة..."
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};