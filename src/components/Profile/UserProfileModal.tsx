import { Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { 
  XMarkIcon, 
  UserPlusIcon, 
  NoSymbolIcon,
  ShieldExclamationIcon,
  StarIcon,
  SpeakerWaveIcon,
  MegaphoneIcon,
  UserMinusIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types/user';
import { motion } from 'framer-motion';
import { UserLevel } from '../UserLevel/UserLevel';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  context?: 'chat' | 'room' | 'general';
}

const getAccountLevel = (userId: string) => {
  const level = parseInt(userId) % 5 + 1;
  const progress = Math.floor(Math.random() * 100);
  return { level, progress };
};

export const UserProfileModal = ({ user, isOpen, onClose, context = 'general' }: UserProfileModalProps) => {
  const { level, progress } = getAccountLevel(user.userId);
  const nextLevel = level + 1;

  const handleAddFriend = () => {
    // Add friend logic
    console.log('Add friend:', user.id);
  };

  const handleBlockUser = () => {
    // Block user logic
    console.log('Block user:', user.id);
  };

  const handleReport = () => {
    // Report user logic
    console.log('Report user:', user.id);
  };

  const handleMakeRoomModerator = () => {
    // Make room moderator logic
    console.log('Make moderator:', user.id);
  };

  const handleMuteUser = () => {
    // Mute user logic
    console.log('Mute user:', user.id);
  };

  const handleKickUser = () => {
    // Kick user logic
    console.log('Kick user:', user.id);
  };

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
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

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

                  <div className="mt-4 flex items-center gap-2">
                    <UserLevel userId={user.id} size="lg" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.nickname || user.name}
                    </h2>
                  </div>

                  {user.bio && (
                    <p className="mt-2 text-gray-600 text-center">{user.bio}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={handleAddFriend}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <UserPlusIcon className="w-5 h-5" />
                      <span>إضافة صديق</span>
                    </button>

                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                        <ShieldExclamationIcon className="w-5 h-5" />
                        <span>المزيد</span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="p-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleBlockUser}
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                                >
                                  <NoSymbolIcon className="ml-2 h-5 w-5" />
                                  حظر المستخدم
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleReport}
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  <ShieldExclamationIcon className="ml-2 h-5 w-5" />
                                  إبلاغ
                                </button>
                              )}
                            </Menu.Item>

                            {context === 'room' && (
                              <>
                                <div className="my-1 border-t border-gray-100" />
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={handleMakeRoomModerator}
                                      className={`${
                                        active ? 'bg-gray-50' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                    >
                                      <StarIcon className="ml-2 h-5 w-5" />
                                      تعيين كمشرف
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={handleMuteUser}
                                      className={`${
                                        active ? 'bg-gray-50' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                    >
                                      <SpeakerWaveIcon className="ml-2 h-5 w-5" />
                                      كتم الصوت
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={handleKickUser}
                                      className={`${
                                        active ? 'bg-gray-50' : ''
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                                    >
                                      <UserMinusIcon className="ml-2 h-5 w-5" />
                                      طرد من الغرفة
                                    </button>
                                  )}
                                </Menu.Item>
                              </>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};