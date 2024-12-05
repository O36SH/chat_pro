import { Chat } from '../types/chat';
import { Friend } from '../types/friend';
import { Room } from '../types/room';
import { Post } from '../types/post';
import { User } from '../types/user';
import { Event } from '../types/event';
import { StoreItem } from '../types/store';
import { generateUserId } from '../utils/generateUserId';

export const currentUser: User = {
  id: '1',
  name: 'المستخدم',
  email: 'user@example.com',
  avatar: '👤',
  userId: generateUserId(),
  nickname: 'نجم التطبيق',
  bio: 'مرحباً بكم في صفحتي الشخصية! 👋',
  status: 'online',
  theme: 'default',
  language: 'ar',
  privacySettings: {
    showOnlineStatus: true,
    showLastSeen: true,
    allowFriendRequests: true
  }
};

export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'أحمد',
    lastMessage: 'مرحباً، كيف حالك؟',
    unreadCount: 2,
    avatar: '👨',
    type: 'private'
  },
  {
    id: '2',
    name: 'غرفة البرمجة',
    lastMessage: 'شكراً جزيلاً!',
    unreadCount: 0,
    avatar: '💻',
    type: 'room',
    roomId: 'dev_room'
  },
  {
    id: '3',
    name: 'محمد',
    lastMessage: 'سأكون هناك في الموعد',
    unreadCount: 1,
    avatar: '👨‍💼',
    type: 'general'
  }
];

export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'فاطمة',
    avatar: '👩‍🦰',
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'عمر',
    avatar: '👨‍🦱',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    name: 'ليلى',
    avatar: '👩‍🦱',
    status: 'online',
    lastSeen: new Date()
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'غرفة التقنية',
    description: 'نقاشات حول التكنولوجيا والبرمجة',
    membersCount: 150,
    avatar: '💻',
    category: 'تقنية'
  },
  {
    id: '2',
    name: 'غرفة الفنون',
    description: 'مساحة للإبداع والفن',
    membersCount: 89,
    avatar: '🎨',
    category: 'فنون'
  },
  {
    id: '3',
    name: 'غرفة الرياضة',
    description: 'كل ما يتعلق بالرياضة والصحة',
    membersCount: 234,
    avatar: '⚽',
    category: 'رياضة'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'ريم',
      avatar: '👩‍🎨'
    },
    content: 'يوم جميل للإبداع! 🎨',
    images: ['🎨', '🖼️'],
    likes: 24,
    comments: 5,
    createdAt: new Date()
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'خالد',
      avatar: '👨‍💻'
    },
    content: 'أحب البرمجة! 💻',
    likes: 15,
    comments: 3,
    createdAt: new Date(Date.now() - 86400000)
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'غرفة البرمجة - بث مباشر',
    description: 'مناقشة حول تطوير تطبيقات الويب الحديثة',
    date: new Date(),
    type: 'room_live',
    participants: 120,
    icon: '💻',
    roomId: 'dev_room',
    stats: {
      members: 250,
      messages: 1500
    }
  },
  {
    id: '2',
    title: 'غرفة التصميم - جلسة قادمة',
    description: 'ورشة عمل حول أساسيات UI/UX',
    date: new Date(Date.now() + 86400000),
    type: 'room_upcoming',
    participants: 80,
    icon: '🎨',
    roomId: 'design_room',
    stats: {
      members: 180,
      messages: 900
    }
  },
  {
    id: '3',
    title: 'غرفة الألعاب 🎮',
    description: 'أنشط غرفة هذا الأسبوع! تفاعل مميز ومجتمع رائع',
    date: new Date(),
    type: 'featured_room',
    icon: '🏆',
    roomId: 'gaming_room',
    stats: {
      members: 500,
      messages: 3000,
      rating: 4.9
    }
  }
];

export const mockStoreItems: StoreItem[] = [
  {
    id: '1',
    name: 'إطار ذهبي',
    description: 'إطار مميز لصورتك الشخصية',
    price: 1000,
    icon: '🖼️',
    category: 'frames',
    isNew: true
  },
  {
    id: '2',
    name: 'شارة VIP',
    description: 'شارة خاصة تظهر بجانب اسمك',
    price: 2000,
    icon: '🏅',
    category: 'badges',
    discount: 20
  },
  {
    id: '3',
    name: 'تأثير دخول مميز',
    description: 'تأثير خاص عند دخولك الغرف',
    price: 1500,
    icon: '✨',
    category: 'effects'
  }
];