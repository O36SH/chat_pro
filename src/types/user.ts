export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userId: string;
  nickname?: string;
  bio?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  status?: 'online' | 'away' | 'busy' | 'offline';
  theme?: string;
  language?: string;
  privacySettings?: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    allowFriendRequests: boolean;
  };
}