import React from 'react';
import { Button } from './Button';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TableComponent<T>({ 
  data, 
  columns, 
  keyExtractor, 
  isLoading, 
  emptyMessage = "No records found" 
}: TableProps<T>) {
  
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500/80 italic border rounded-xl border-gray-200 dark:border-[#3b544f] bg-white dark:bg-[#111817]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border-light dark:border-[#3b544f] bg-white dark:bg-[#111817] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-[#1c2725] border-b border-gray-200 dark:border-[#3b544f]">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9db9b4] ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#3b544f]">
            {data.map((item, rowIdx) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-slate-50 dark:hover:bg-[#1c2725]/50 transition-colors group"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 text-sm text-slate-500 dark:text-[#9db9b4]">
                    {col.render ? col.render(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#3b544f] bg-slate-50 dark:bg-[#1c2725]">
      <div className="hidden sm:flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-[#9db9b4]">
            Showing <span className="font-medium text-slate-900 dark:text-white">{startItem}</span> to <span className="font-medium text-slate-900 dark:text-white">{endItem}</span> of <span className="font-medium text-slate-900 dark:text-white">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-[#3b544f] hover:bg-gray-50 dark:hover:bg-[#283936] focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            
            {/* Simple Pagination Logic: Show current page */}
            <button
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-[#10221f] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {currentPage}
            </button>

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-[#3b544f] hover:bg-gray-50 dark:hover:bg-[#283936] focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="flex sm:hidden justify-between w-full">
         <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
      </div>
    </div>
  );
}
