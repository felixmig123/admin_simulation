import { useState, useEffect } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { TableComponent } from '../../components/common/TableComponent';
import { Button } from '../../components/common/Button';
import { ModalComponent } from '../../components/common/ModalComponent';
import { CategoryForm } from '../../components/admin/CategoryForm';
import type { Category } from '../../types/models';

export const CategoriesPage = () => {
  const [data, setData] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
        const categories = localStorageService.getAll<Category>(STORAGE_KEYS.CATEGORIES);
        setData(categories);
        setIsLoading(false);
    }, 300);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      localStorageService.delete<Category>(STORAGE_KEYS.CATEGORIES, id);
      fetchData();
    }
  };

  const handleSave = (categoryData: Partial<Category>) => {
    setIsLoading(true);
    setTimeout(() => {
       try {
           if (editingCategory) {
             localStorageService.update<Category>(STORAGE_KEYS.CATEGORIES, editingCategory.id, categoryData);
           } else {
             const newCategory: Category = {
               id: `cat-${Date.now()}`,
               name: categoryData.name!,
               description: categoryData.description || '',
               productCount: 0,
               createdAt: new Date().toISOString().split('T')[0]
             };
             localStorageService.add<Category>(STORAGE_KEYS.CATEGORIES, newCategory);
           }
           setIsModalOpen(false);
           fetchData();
       } catch (error) {
           console.error("Failed to save category", error);
       } finally {
           setIsLoading(false);
       }
    }, 500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const columns = [
    { 
        header: 'Category Name', 
        accessorKey: 'name' as const,
        render: (c: Category) => (
            <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
        )
    },
    { 
        header: 'Description', 
        accessorKey: 'description' as const,
        render: (c: Category) => <span className="text-gray-500 truncate max-w-xs block">{c.description || '-'}</span>
    },
    { 
        header: 'Products', 
        accessorKey: 'productCount' as const,
        render: (c: Category) => (
            <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-[#283936] text-gray-700 dark:text-[#9db9b4] text-xs font-bold rounded-full">
                {c.productCount} items
            </span>
        )
    },
    { header: 'Created', accessorKey: 'createdAt' as const },
    {
      header: 'Actions',
      className: 'text-right',
      render: (c: Category) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => handleEdit(c)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#283936] rounded text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button 
            onClick={() => handleDelete(c.id)}
            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-gray-500 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Manage product categories</p>
        </div>
        <Button onClick={() => { setEditingCategory(null); setIsModalOpen(true); }} leftIcon={<span className="material-symbols-outlined">add_circle</span>}>
          Add Category
        </Button>
      </div>

      <TableComponent<Category>
        data={data}
        columns={columns}
        keyExtractor={(c) => c.id}
        isLoading={isLoading}
        emptyMessage="No categories found."
      />

      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        size="md"
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSave}
          onCancel={closeModal}
          isLoading={isLoading}
        />
      </ModalComponent>
    </div>
  );
};
