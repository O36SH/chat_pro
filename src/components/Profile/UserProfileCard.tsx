import { User } from '../../types/user';
import { motion } from 'framer-motion';

interface UserProfileCardProps {
  user: User;
}

const getAccountLevel = (userId: string) => {
  const level = parseInt(userId) % 5 + 1;
  const progress = Math.floor(Math.random() * 100);
  return { level, progress };
};

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const { level, progress } = getAccountLevel(user.userId);
  const nextLevel = level + 1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-7xl">{user.avatar}</span>
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            user.status === 'online' ? 'bg-green-500' :
            user.status === 'away' ? 'bg-yellow-500' :
            user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
          }`} />
        </motion.div>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          {user.nickname || user.name}
        </h2>

        <div className="w-full mt-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">المستوى {level}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">المستوى {nextLevel}</span>
          </div>

          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute top-0 left-0 h-full w-full"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-gray-600">{progress}% مكتمل</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};