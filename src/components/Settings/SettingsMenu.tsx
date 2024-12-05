import { Fragment, useState } from 'react';
import { Dialog, Transition, Switch, RadioGroup, Disclosure } from '@headlessui/react';
import {
  XMarkIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  LanguageIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  KeyIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
  SpeakerWaveIcon,
  NoSymbolIcon,
  HandRaisedIcon,
  LockClosedIcon,
  PhotoIcon,
  BellAlertIcon,
  BellSlashIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsMenu = ({ isOpen, onClose }: SettingsMenuProps) => {
  // إعدادات عامة
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState('medium');

  // إعدادات الغرف
  const [roomNotifications, setRoomNotifications] = useState({
    all: true,
    mentions: true,
    announcements: true,
    events: true
  });
  const [roomSounds, setRoomSounds] = useState({
    chat: true,
    join: true,
    leave: true
  });
  const [roomBackground, setRoomBackground] = useState('default');
  const [roomPrivacy, setRoomPrivacy] = useState('public');
  const [roomModeration, setRoomModeration] = useState(true);
  const [roomAutoMute, setRoomAutoMute] = useState(false);
  const [roomVideoQuality, setRoomVideoQuality] = useState('auto');
  const [roomMicrophoneMode, setRoomMicrophoneMode] = useState('voice');

  const themes = [
    { id: 'default', name: 'الافتراضي', color: 'bg-blue-500' },
    { id: 'green', name: 'أخضر', color: 'bg-green-500' },
    { id: 'purple', name: 'بنفسجي', color: 'bg-purple-500' },
    { id: 'pink', name: 'وردي', color: 'bg-pink-500' },
  ];

  const fontSizes = [
    { id: 'small', name: 'صغير' },
    { id: 'medium', name: 'متوسط' },
    { id: 'large', name: 'كبير' },
  ];

  const backgrounds = [
    { id: 'default', name: 'افتراضي', preview: '🎨' },
    { id: 'gradient', name: 'متدرج', preview: '🌈' },
    { id: 'pattern', name: 'نمط', preview: '🔲' },
    { id: 'custom', name: 'مخصص', preview: '🖼️' },
  ];

  const videoQualities = [
    { id: 'auto', name: 'تلقائي' },
    { id: 'low', name: 'منخفضة' },
    { id: 'medium', name: 'متوسطة' },
    { id: 'high', name: 'عالية' },
  ];

  const microphoneModes = [
    { id: 'voice', name: 'صوت فقط' },
    { id: 'music', name: 'موسيقى' },
    { id: 'noise_reduction', name: 'تقليل الضوضاء' },
  ];

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    الإعدادات
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* إعدادات الغرف */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-3 text-right text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <span>إعدادات الغرف</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-blue-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="space-y-6">
                            {/* إشعارات الغرف */}
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700">إشعارات الغرف</label>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <BellIcon className="h-5 w-5 text-gray-600 ml-2" />
                                    <span className="text-sm">جميع الإشعارات</span>
                                  </div>
                                  <Switch
                                    checked={roomNotifications.all}
                                    onChange={(value) => setRoomNotifications(prev => ({ ...prev, all: value }))}
                                    className={`${
                                      roomNotifications.all ? 'bg-blue-600' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                                  >
                                    <span className={`${
                                      roomNotifications.all ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                  </Switch>
                                </div>
                                {/* Add other room notification settings */}
                              </div>
                            </div>

                            {/* أصوات الغرف */}
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700">أصوات الغرف</label>
                              {/* Add room sound settings */}
                            </div>

                            {/* خلفية الغرفة */}
                            <div className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700">خلفية الغرفة</label>
                              {/* Add room background settings */}
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* الإعدادات العامة */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-right text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>الإعدادات العامة</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {darkMode ? <MoonIcon className="h-6 w-6 text-gray-600 ml-3" /> : <SunIcon className="h-6 w-6 text-gray-600 ml-3" />}
                                <span>الوضع الليلي</span>
                              </div>
                              <Switch
                                checked={darkMode}
                                onChange={setDarkMode}
                                className={`${
                                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                              >
                                <span className={`${
                                  darkMode ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                              </Switch>
                            </div>
                            {/* Add other general settings */}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* الإشعارات */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-right text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>الإشعارات</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <BellIcon className="h-6 w-6 text-gray-600 ml-3" />
                                <span>تفعيل الإشعارات</span>
                              </div>
                              <Switch
                                checked={notifications}
                                onChange={setNotifications}
                                className={`${
                                  notifications ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                              >
                                <span className={`${
                                  notifications ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                              </Switch>
                            </div>
                            {/* Add other notification settings */}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};