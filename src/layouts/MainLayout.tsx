import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from '../components/Navigation/BottomNavigation';
import { TopBar } from '../components/Navigation/TopBar';

export const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-20 pt-20">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Outlet />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};