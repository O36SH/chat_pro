import { useState } from 'react';
import { currentUser } from '../data/mockData';
import { Switch } from '@headlessui/react';
import { PencilIcon, CheckIcon, HomeIcon } from '@heroicons/react/24/outline';
import { AvatarUpload } from '../components/Profile/AvatarUpload';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [nickname, setNickname] = useState(currentUser.nickname || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [status, setStatus] = useState(currentUser.status || 'online');
  const [birthDate, setBirthDate] = useState(currentUser.birthDate || '');
  const [gender, setGender] = useState(currentUser.gender || 'prefer_not_to_say');
  const [showOnlineStatus, setShowOnlineStatus] = useState(
    currentUser.privacySettings?.showOnlineStatus || true
  );
  const [showLastSeen, setShowLastSeen] = useState(
    currentUser.privacySettings?.showLastSeen || true
  );

  const statusOptions = [
    { value: 'online', label: 'متصل', emoji: '🟢' },
    { value: 'away', label: 'غير متواجد', emoji: '🟡' },
    { value: 'busy', label: 'مشغول', emoji: '🔴' },
    { value: 'offline', label: 'غير متصل', emoji: '⚫' }
  ];

  const genderOptions = [
    { value: 'male', label: 'ذكر' },
    { value: 'female', label: 'أنثى' },
    { value: 'other', label: 'آخر' },
    { value: 'prefer_not_to_say', label: 'أفضل عدم التحديد' }
  ];

  const handleSave = () => {
    // هنا يمكن إضافة منطق حفظ التغييرات
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="العودة للرئيسية"
          >
            <HomeIcon className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isEditing ? 'حفظ' : 'تعديل'}
        >
          {isEditing ? (
            <CheckIcon className="w-6 h-6 text-blue-600" />
          ) : (
            <PencilIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* الصورة والمعلومات الأساسية */}
      <div className="text-center space-y-4">
        <AvatarUpload
          currentAvatar={avatar}
          isEditing={isEditing}
          onAvatarChange={setAvatar}
          status={status}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-xl font-semibold text-center w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0"
            placeholder="أدخل اسمك المستعار"
          />
        ) : (
          <h2 className="text-xl font-semibold">{nickname || currentUser.name}</h2>
        )}
        
        <div className="bg-gray-100 rounded-lg py-2 px-4 inline-block">
          <p className="text-sm text-gray-600">معرف المستخدم</p>
          <p className="font-mono text-lg font-semibold">{currentUser.userId}</p>
        </div>
      </div>

      {/* نبذة تعريفية */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900">نبذة تعريفية</h3>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-24 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="اكتب نبذة عن نفسك..."
          />
        ) : (
          <p className="text-gray-600">{bio}</p>
        )}
      </div>

      {/* الحالة */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900">الحالة</h3>
        {isEditing ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.emoji} {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              status === 'online' ? 'bg-green-500' :
              status === 'away' ? 'bg-yellow-500' :
              status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
            }`} />
            <span className="text-gray-600">
              {statusOptions.find(opt => opt.value === status)?.label}
            </span>
          </div>
        )}
      </div>

      {/* إعدادات الخصوصية */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">إعدادات الخصوصية</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">إظهار حالة الاتصال</span>
          <Switch
            checked={showOnlineStatus}
            onChange={setShowOnlineStatus}
            disabled={!isEditing}
            className={`${
              showOnlineStatus ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className={`${
              showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">إظهار آخر ظهور</span>
          <Switch
            checked={showLastSeen}
            onChange={setShowLastSeen}
            disabled={!isEditing}
            className={`${
              showLastSeen ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className={`${
              showLastSeen ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>
      </div>

      {/* معلومات إضافية اختيارية */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-sm font-medium text-gray-900">معلومات إضافية (اختياري)</h3>
        
        {/* تاريخ الميلاد */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">تاريخ الميلاد</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* الجنس */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">الجنس</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};