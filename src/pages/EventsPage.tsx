import { mockEvents } from '../data/mockData';
import { CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';

export const EventsPage = () => {
  const upcomingEvents = mockEvents.filter(event => event.type === 'upcoming');
  const liveEvents = mockEvents.filter(event => event.type === 'live');
  const endedEvents = mockEvents.filter(event => event.type === 'ended');

  const renderEvent = (event: typeof mockEvents[0]) => (
    <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-reverse space-x-3">
        <div className="text-3xl">{event.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            <span className={`text-sm px-2 py-1 rounded-full ${
              event.type === 'live' ? 'bg-red-100 text-red-700' :
              event.type === 'upcoming' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {event.type === 'live' ? 'مباشر' :
               event.type === 'upcoming' ? 'قادم' : 'منتهي'}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 ml-1" />
              {new Date(event.date).toLocaleDateString('ar-EG')}
            </div>
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 ml-1" />
              {event.participants} مشارك
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {liveEvents.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            البث المباشر
          </h2>
          <div className="space-y-3">
            {liveEvents.map(renderEvent)}
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">الأحداث القادمة</h2>
          <div className="space-y-3">
            {upcomingEvents.map(renderEvent)}
          </div>
        </section>
      )}

      {endedEvents.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">الأحداث المنتهية</h2>
          <div className="space-y-3">
            {endedEvents.map(renderEvent)}
          </div>
        </section>
      )}
    </div>
  );
};