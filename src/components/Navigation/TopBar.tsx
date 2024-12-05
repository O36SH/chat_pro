import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { SettingsMenu } from '../Settings/SettingsMenu';
import { useAuthStore } from '../../store/authStore';
import { APP_CONFIG } from '../../constants/config';

export const TopBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <>
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{APP_CONFIG.APP_NAME}</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="تسجيل الخروج"
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsSettingsOpen(true)}
                aria-label="الإعدادات"
              >
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
              <Link 
                to="/profile" 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="الملف الشخصي"
              >
                <UserCircleIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SettingsMenu 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};