export type RoomLevel = {
  name: string;
  color: {
    bg: string;
    text: string;
    ring: string;
  };
};

export const getRoomLevel = (roomId: string): RoomLevel => {
  // تحديد المستوى بناءً على معرف الغرفة
  const levelIndex = parseInt(roomId) % 5;
  
  const levels: RoomLevel[] = [
    {
      name: 'مبتدئة',
      color: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        ring: 'ring-gray-500/20'
      }
    },
    {
      name: 'نشطة',
      color: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        ring: 'ring-blue-500/20'
      }
    },
    {
      name: 'متقدمة',
      color: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        ring: 'ring-green-500/20'
      }
    },
    {
      name: 'مميزة',
      color: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        ring: 'ring-purple-500/20'
      }
    },
    {
      name: 'نخبة',
      color: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        ring: 'ring-yellow-500/20'
      }
    }
  ];

  return levels[levelIndex];
};