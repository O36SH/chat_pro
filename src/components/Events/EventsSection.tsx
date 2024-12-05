import { mockEvents } from '../../data/mockData';
import { CalendarIcon, UsersIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types/event';

export const EventsSection = () => {
  const liveRoomEvents = mockEvents.filter(event => event.type === 'room_live');
  const upcomingRoomEvents = mockEvents.filter(event => event.type === 'room_upcoming');
  const featuredRooms = mockEvents.filter(event => event.type === 'featured_room');
  const featuredUsers = mockEvents.filter(event => event.type === 'featured_user');

  const renderRoomEvent = (event: Event) => (
    <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-reverse space-x-3">
        <div className="text-3xl">{event.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            <span className={`text-sm px-2 py-1 rounded-full ${
              event.type === 'room_live' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {event.type === 'room_live' ? 'مباشر' : 'قادم'}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 ml-1" />
              {new Date(event.date).toLocaleDateString('ar-EG')}
            </div>
            {event.participants && (
              <div className="flex items-center">
                <UsersIcon className="w-4 h-4 ml-1" />
                {event.participants} مشارك
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatured = (event: Event) => (
    <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-reverse space-x-3">
        <div className="text-3xl">{event.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            {event.stats?.rating && (
              <div className="flex items-center text-yellow-500">
                <StarIcon className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm">{event.stats.rating}</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm">{event.description}</p>
          {event.stats && (event.stats.members || event.stats.messages) && (
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {event.stats.members && (
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 ml-1" />
                  {event.stats.members} عضو
                </div>
              )}
              {event.stats.messages && (
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 ml-1" />
                  {event.stats.messages} رسالة
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">الأحداث والأخبار</h2>
      <div className="space-y-6">
        {/* Live Room Events */}
        {liveRoomEvents.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
              بث مباشر في الغرف
            </h3>
            <div className="space-y-3">
              {liveRoomEvents.map(renderRoomEvent)}
            </div>
          </div>
        )}

        {/* Upcoming Room Events */}
        {upcomingRoomEvents.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">أحداث قادمة في الغرف</h3>
            <div className="space-y-3">
              {upcomingRoomEvents.map(renderRoomEvent)}
            </div>
          </div>
        )}

        {/* Featured Rooms */}
        {featuredRooms.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">غرف مميزة</h3>
            <div className="space-y-3">
              {featuredRooms.map(renderFeatured)}
            </div>
          </div>
        )}

        {/* Featured Users */}
        {featuredUsers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">مستخدمون مميزون</h3>
            <div className="space-y-3">
              {featuredUsers.map(renderFeatured)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};