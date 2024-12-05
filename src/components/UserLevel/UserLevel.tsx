import { useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface UserLevelProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserLevel = ({ userId, size = 'md' }: UserLevelProps) => {
  const level = useMemo(() => {
    return parseInt(userId) % 5 + 1;
  }, [userId]);

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-medium',
        'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm',
        size === 'sm' && 'w-5 h-5 text-xs',
        size === 'md' && 'w-6 h-6 text-sm',
        size === 'lg' && 'w-7 h-7 text-base',
      )}
    >
      {level}
    </motion.span>
  );
};