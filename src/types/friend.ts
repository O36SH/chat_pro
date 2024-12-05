export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}