import { mockStoreItems } from '../../data/mockData';
import { StoreItem } from '../../types/store';

export const StoreSection = () => {
  const featuredItems = mockStoreItems.filter(item => item.isNew || item.discount).slice(0, 3);

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
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">المتجر</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredItems.map(renderStoreItem)}
      </div>
    </section>
  );
};