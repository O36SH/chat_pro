export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
}