import { useState } from 'react';
import { mockPosts } from '../data/mockData';
import { PostList } from '../components/Posts/PostList';
import { CreatePost } from '../components/Posts/CreatePost';

export const PostsPage = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (content: string, images: string[]) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        id: '1',
        name: 'أنت',
        avatar: '👤'
      },
      content,
      images,
      likes: 0,
      comments: 0,
      createdAt: new Date()
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-4">
      <CreatePost onCreatePost={handleCreatePost} />
      <PostList posts={posts} />
    </div>
  );
};