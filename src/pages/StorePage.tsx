import { useState } from 'react';
import { mockStoreItems } from '../data/mockData';
import { Tab } from '@headlessui/react';
import { StoreItem } from '../types/store';
import clsx from 'clsx';

export const StorePage = () => {
  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'frames', label: 'إطارات' },
    { id: 'badges', label: 'شارات' },
    { id: 'effects', label: 'تأثيرات' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? mockStoreItems
    : mockStoreItems.filter(item => item.category === selectedCategory);

  const renderStoreItem = (item: StoreItem) => (
    <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <div className="relative">
        <div className="text-4xl mb-3">{item.icon}</div>
        {item.isNew && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            جديد
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{item.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.discount ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                {item.price - (item.price * item.discount / 100)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {item.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{item.price}</span>
          )}
          <span className="text-sm text-gray-500">نقطة</span>
        </div>
        <button className="btn btn-primary text-sm">
          شراء
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
        <Tab.List className="flex space-x-reverse space-x-1 rounded-xl bg-blue-50/80 p-1">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-blue-600 hover:bg-white/40 hover:text-blue-700'
                )
              }
            >
              {category.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(renderStoreItem)}
      </div>
    </div>
  );
};