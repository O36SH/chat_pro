import { Room } from '../../types/room';
import { UsersIcon } from '@heroicons/react/24/outline';
import { getRoomLevel } from '../../utils/roomLevels';

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const level = getRoomLevel(room.id);

  return (
    <div className="p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
      <div className="flex items-start space-x-reverse space-x-4">
        <div className="text-3xl flex-shrink-0">{room.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {room.name}
              </h3>
              <span className={`${level.color.bg} ${level.color.text} px-2 py-0.5 text-xs font-medium rounded-full ring-1 ${level.color.ring}`}>
                {level.name}
              </span>
            </div>
            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {room.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {room.description}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <UsersIcon className="w-4 h-4 ml-1" />
            <span>{room.membersCount} عضو</span>
          </div>
        </div>
      </div>
    </div>
  );
};