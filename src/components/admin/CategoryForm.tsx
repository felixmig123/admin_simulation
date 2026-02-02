import React, { useState, useEffect } from 'react';
import type { Category } from '../../types/models';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (data: Partial<Category>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CategoryForm = ({ initialData, onSubmit, onCancel, isLoading }: CategoryFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          label="Category Name"
          placeholder="e.g. Electronics"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        
        <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Description</label>
            <textarea 
                className="flex w-full min-w-0 flex-1 resize-y rounded-lg border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] p-3 text-slate-900 dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-slate-400 dark:placeholder:text-[#9db9b4]"
                rows={3}
                placeholder="Category description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#3b544f]">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={name.trim().length === 0}>
          {initialData ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
};
