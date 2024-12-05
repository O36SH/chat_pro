import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import { currentUser } from '../../data/mockData';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, this would make an API call
    login(currentUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-soft"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <Link to="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
              سجل الآن
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="example@example.com"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                تذكرني
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو سجل باستخدام</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">Sign in with Snapchat</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.206 3c.332 0 1.417.107 1.417.107.355.113.686.27.984.466a4.85 4.85 0 0 1 1.013.889c.31.364.547.773.706 1.206.273.747.206 1.995.153 2.996-.002.035-.006.068-.008.102l-.001.011c-.001.008-.001.016-.001.024 0 .095.038.183.1.248.071.074.169.121.277.121.059 0 .115-.013.166-.037h.001c.19-.089.394-.133.603-.133.144 0 .285.021.418.062h.001c.316.091.6.271.818.517.243.274.391.63.391 1.019 0 .142-.019.28-.055.41v.001c-.048.176-.123.339-.22.488l-.001.002c-.103.164-.226.315-.365.448l-.002.002c-.157.154-.329.293-.513.414l-.004.002c-.195.13-.402.241-.619.329l-.009.003c-.223.09-.458.156-.7.195l-.012.002c-.252.041-.511.062-.772.062-.493 0-.97-.067-1.422-.193l.038.009c-.446-.122-.85-.301-1.216-.53l.016.009c-.358-.219-.672-.467-.951-.747l.001.001c-.27-.269-.506-.571-.704-.897l-.01-.018c-.186-.307-.33-.657-.415-1.027l-.005-.024c-.083-.357-.13-.766-.13-1.187 0-.071.001-.142.004-.212v.01c.006-.151.021-.296.044-.438l-.003.02c.024-.145.057-.282.099-.415l-.005.018c.042-.13.091-.252.149-.368l-.006.013c.06-.12.127-.234.202-.342l-.006.009c.08-.114.167-.223.262-.323l-.001.001c.101-.108.211-.208.328-.298l.006-.004c.123-.096.261-.185.406-.263l.013-.006c.149-.08.321-.147.5-.193l.016-.003c.189-.049.406-.077.63-.077h.019-.001c.218 0 .429.027.63.077h-.017c.179.046.351.113.516.202l-.012-.006c.148.074.286.163.415.267l-.005-.004c.117.09.227.19.328.298l-.001-.001c.094.099.181.208.255.323l.006.009c.069.099.136.213.196.333l.006.013c.052.115.101.247.14.384l.005.018c.036.137.063.282.069.433v.005c.003.06.004.13.004.201 0 .421-.047.83-.137 1.223l.007-.036c-.09.394-.234.744-.426 1.064l.008-.014c-.198.344-.434.646-.709.915l.001-.001c-.278.28-.592.528-.933.741l-.016.009c-.35.22-.754.399-1.184.516l-.038.009c-.414.117-.891.184-1.384.184-.261 0-.52-.021-.772-.062l.028.004c-.254-.039-.489-.105-.712-.195l.02.007c-.217-.088-.424-.199-.619-.329l.009.006c-.184-.121-.356-.26-.509-.414l-.004-.004c-.141-.135-.264-.286-.367-.45l-.005-.008c-.097-.149-.172-.312-.22-.488v-.001c-.036-.13-.055-.268-.055-.41 0-.389.148-.745.391-1.019.218-.246.502-.426.824-.518h.001c.133-.041.274-.062.418-.062.209 0 .413.044.603.133h-.01c.051.024.107.037.166.037.108 0 .206-.047.277-.121.062-.065.1-.153.1-.248 0-.008 0-.016-.001-.024v.001l-.001-.011c-.002-.034-.006-.067-.008-.102-.053-1.001-.12-2.249.153-2.996.159-.433.396-.842.711-1.209l-.005.003c.291-.339.634-.626 1.013-.889.298-.196.629-.353.984-.466 0 0 1.085-.107 1.417-.107z"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};