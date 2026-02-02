import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuth();
  return (
    <header className="border-b border-gray-200 dark:border-[#283936] bg-white dark:bg-[#10221f] sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-4">
        
        {/* Mobile Menu Button */}
        <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 dark:text-[#9db9b4] hover:bg-gray-100 dark:hover:bg-[#182d29] rounded-lg"
        >
            <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Spacer to push content to right */ }
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-4">

            
            <div className="flex items-center gap-3 cursor-pointer">
                <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-[#283936]"
                    style={{ backgroundImage: `url("${user?.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=random'}")` }}
                ></div>
                <div className="hidden sm:flex flex-col">
                    <span className="text-gray-900 dark:text-white text-sm font-bold leading-tight">{user?.username || 'Guest'}</span>
                    <span className="text-gray-500 dark:text-[#9db9b4] text-xs font-medium uppercase">{user?.roleId?.replace('role-', '') || 'Visitor'}</span>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};
