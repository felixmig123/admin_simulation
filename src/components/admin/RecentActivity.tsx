// Mock activity logs
const ACTIVITY_LOGS = [
  { id: 1, user: 'admin', action: 'created a new product', target: 'Wireless Headphones', time: '2 mins ago', icon: 'add_box' },
  { id: 2, user: 'jdoe', action: 'updated stock for', target: 'Cotton T-Shirt', time: '45 mins ago', icon: 'inventory' },
  { id: 3, user: 'admin', action: 'deleted user', target: 'guest_user', time: '1 hour ago', icon: 'person_remove' },
  { id: 4, user: 'asmith', action: 'logged in', target: '', time: '3 hours ago', icon: 'login' },
  { id: 5, user: 'admin', action: 'changed role for', target: 'jdoe', time: '5 hours ago', icon: 'manage_accounts' },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-[#1c2725] rounded-xl border border-gray-200 dark:border-[#283936] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-primary text-sm font-bold hover:underline">View All</button>
      </div>

      <div className="flex flex-col gap-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-100 dark:bg-[#283936]"></div>

          {ACTIVITY_LOGS.map((log) => (
              <div key={log.id} className="flex gap-4 relative">
                  <div className="size-10 rounded-full bg-white dark:bg-[#1c2725] border-2 border-gray-100 dark:border-[#3b544f] flex items-center justify-center shrink-0 z-10">
                      <span className="material-symbols-outlined text-[20px] text-primary">{log.icon}</span>
                  </div>
                  <div className="py-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                          <span className="font-bold">{log.user}</span> {log.action} <span className="font-bold">{log.target}</span>
                      </p>
                      <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
