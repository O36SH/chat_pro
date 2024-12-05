import { Tab } from '@headlessui/react';
import { ChatType } from '../../types/chat';
import clsx from 'clsx';

interface ChatTabsProps {
  selectedType: ChatType;
  onTypeChange: (type: ChatType) => void;
}

const tabs: { type: ChatType; label: string }[] = [
  { type: 'general', label: 'عام' },
  { type: 'room', label: 'الغرف' },
  { type: 'private', label: 'خاص' },
];

export const ChatTabs = ({ selectedType, onTypeChange }: ChatTabsProps) => {
  return (
    <Tab.Group
      selectedIndex={tabs.findIndex(tab => tab.type === selectedType)}
      onChange={index => onTypeChange(tabs[index].type)}
    >
      <Tab.List className="flex space-x-reverse space-x-1 rounded-xl bg-blue-50/80 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.type}
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium transition-all duration-200',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow-sm text-blue-700'
                  : 'text-blue-600 hover:bg-white/40 hover:text-blue-700'
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};