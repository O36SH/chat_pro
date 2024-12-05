import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <motion.div
        className="w-16 h-16 border-4 border-blue-200 rounded-full"
        style={{ borderTopColor: '#3B82F6' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};