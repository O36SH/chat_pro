import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'بحث...' }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            className="flex items-center"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border-gray-200 pr-4 focus:border-blue-500 focus:ring-blue-500 text-sm placeholder:text-gray-400"
              autoFocus
              onBlur={() => {
                if (!value) {
                  setIsExpanded(false);
                }
              }}
            />
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="بحث"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};