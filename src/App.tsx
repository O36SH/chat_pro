import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { useAuthStore } from './store/authStore';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ChatsPage = lazy(() => import('./pages/ChatsPage').then(module => ({ default: module.ChatsPage })));
const FriendsPage = lazy(() => import('./pages/FriendsPage').then(module => ({ default: module.FriendsPage })));
const RoomsPage = lazy(() => import('./pages/RoomsPage').then(module => ({ default: module.RoomsPage })));
const PostsPage = lazy(() => import('./pages/PostsPage').then(module => ({ default: module.PostsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage })));

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/auth/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/auth/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
          />

          {/* Protected Routes */}
          <Route
            element={
              isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" replace />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;