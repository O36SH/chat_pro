export type EventType = 'room_live' | 'room_upcoming' | 'featured_room' | 'featured_user';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: EventType;
  participants?: number;
  icon: string;
  roomId?: string;
  userId?: string;
  stats?: {
    members?: number;
    messages?: number;
    rating?: number;
  };
}