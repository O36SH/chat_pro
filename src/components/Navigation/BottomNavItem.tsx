import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface BottomNavItemProps {
  to: string;
  icon: (props: ComponentProps<'svg'>) => JSX.Element;
  label: string;
  isActive?: boolean;
}

export const BottomNavItem = ({ to, icon: Icon, label, isActive }: BottomNavItemProps) => {
  return (
    <Link
      to={to}
      className={clsx(
        'flex flex-col items-center justify-center flex-1 py-2 text-xs',
        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
      )}
    >
      <Icon className={clsx('w-6 h-6 mb-1', isActive ? 'text-blue-600' : 'text-gray-500')} />
      <span>{label}</span>
    </Link>
  );
};