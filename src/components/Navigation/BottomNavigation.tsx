import { useLocation } from 'react-router-dom';
import { BottomNavItem } from './BottomNavItem';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      to: '/',
      icon: HomeIcon,
      label: 'الرئيسية'
    },
    {
      to: '/chats',
      icon: ChatBubbleLeftRightIcon,
      label: 'المحادثات'
    },
    {
      to: '/friends',
      icon: UserGroupIcon,
      label: 'الأصدقاء'
    },
    {
      to: '/rooms',
      icon: ChatBubbleOvalLeftEllipsisIcon,
      label: 'الغرف'
    },
    {
      to: '/posts',
      icon: NewspaperIcon,
      label: 'المنشورات'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <BottomNavItem
              key={item.to}
              {...item}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};