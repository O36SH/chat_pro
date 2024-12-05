import { Post } from '../../types/post';
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { UserLevel } from '../UserLevel/UserLevel';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="text-2xl ml-3">{post.author.avatar}</div>
          <div>
            <div className="flex items-center gap-2">
              <UserLevel userId={post.author.id} size="sm" />
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('ar-EG')}
            </span>
          </div>
        </div>
        
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.images.map((image, index) => (
              <div key={index} className="text-4xl">{image}</div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4 text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <HeartIcon className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};