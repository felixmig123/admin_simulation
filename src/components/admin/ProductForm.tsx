import React, { useState, useEffect } from 'react';
import type { Product, Category } from '../../types/models';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProductForm = ({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<Product['status']>('in_stock');
  const [imageUrl, setImageUrl] = useState('');
  
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Load categories
    const loadedCategories = localStorageService.getAll<Category>(STORAGE_KEYS.CATEGORIES);
    setCategories(loadedCategories);
    
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setStock(initialData.stock.toString());
      setCategoryId(initialData.categoryId);
      setStatus(initialData.status);
      setImageUrl(initialData.imageUrl || '');
    } else if (loadedCategories.length > 0) {
        setCategoryId(loadedCategories[0].id);
    }
  }, [initialData]);

  // Update status automatically based on stock
  useEffect(() => {
      const stockNum = parseInt(stock) || 0;
      if (stockNum === 0) setStatus('out_of_stock');
      else if (stockNum < 10) setStatus('low_stock');
      else setStatus('in_stock');
  }, [stock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryId,
      status,
      imageUrl: imageUrl || `https://source.unsplash.com/random/200x200?sig=${Date.now()}` // Fallback mock
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Left Column: Review & Basic Info */}
         <div className="flex flex-col gap-4">
             <div className="aspect-square w-full rounded-lg bg-gray-100 dark:bg-[#1c2725] border border-dashed border-gray-300 dark:border-[#3b544f] flex items-center justify-center overflow-hidden relative group">
                 {imageUrl ? (
                     <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 ) : (
                     <div className="text-center text-gray-400">
                         <span className="material-symbols-outlined text-[48px]">image</span>
                         <p className="text-xs mt-2">No image available</p>
                     </div>
                 )}
                 {/* Mock Upload Overlay */}
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <span className="text-white font-bold text-sm">Change Image</span>
                 </div>
             </div>
             
             <Input
                label="Image URL (Public)"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                leftIcon={<span className="material-symbols-outlined text-[20px]">link</span>}
            />
         </div>

         {/* Right Column: Details */}
         <div className="flex flex-col gap-4">
            <Input
                label="Product Name"
                placeholder="e.g. Wireless Headphones"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />

             <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Price ($)"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    step="0.01"
                />
                <Input
                    label="Stock"
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    required
                />
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Category</label>
                <div className="relative">
                    <select
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        className="flex w-full min-w-0 flex-1 rounded-lg border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] h-12 px-4 text-slate-900 dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none"
                        required
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined">expand_more</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Description</label>
                <textarea 
                    className="flex w-full min-w-0 flex-1 resize-y rounded-lg border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] p-3 text-slate-900 dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-slate-400 dark:placeholder:text-[#9db9b4]"
                    rows={4}
                    placeholder="Product details..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>
         </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#3b544f]">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={!name || !price || !categoryId}>
          {initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};
