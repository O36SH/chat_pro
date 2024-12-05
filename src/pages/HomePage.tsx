import { UserProfileCard } from '../components/Profile/UserProfileCard';
import { EventsSection } from '../components/Events/EventsSection';
import { StoreSection } from '../components/Store/StoreSection';
import { currentUser } from '../data/mockData';

export const HomePage = () => {
  return (
    <div className="space-y-8 py-6">
      <UserProfileCard user={currentUser} />
      <EventsSection />
      <StoreSection />
    </div>
  );
};