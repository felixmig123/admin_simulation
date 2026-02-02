import React, { useState, useEffect } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { TableComponent } from '../../components/common/TableComponent';
import { Button } from '../../components/common/Button';
import { ModalComponent } from '../../components/common/ModalComponent';
import { Input } from '../../components/common/Input';
import { ProductForm } from '../../components/admin/ProductForm';
import type { Product, Category } from '../../types/models';

export const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // View State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
        const products = localStorageService.getAll<Product>(STORAGE_KEYS.PRODUCTS);
        const cats = localStorageService.getAll<Category>(STORAGE_KEYS.CATEGORIES);
        setData(products);
        setCategories(cats);
        setIsLoading(false);
    }, 400);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      localStorageService.delete<Product>(STORAGE_KEYS.PRODUCTS, id);
      fetchData();
    }
  };

  const handleSave = (productData: Partial<Product>) => {
    setIsLoading(true);
    setTimeout(() => {
       try {
           if (editingProduct) {
             localStorageService.update<Product>(STORAGE_KEYS.PRODUCTS, editingProduct.id, productData);
           } else {
             const newProduct: Product = {
               id: `prod-${Date.now()}`,
               name: productData.name!,
               description: productData.description || '',
               price: productData.price || 0,
               stock: productData.stock || 0,
               categoryId: productData.categoryId!,
               status: productData.status || 'in_stock',
               imageUrl: productData.imageUrl,
               createdAt: new Date().toISOString().split('T')[0]
             };
             localStorageService.add<Product>(STORAGE_KEYS.PRODUCTS, newProduct);
             
             // Update category count (simple increment)
             const cat = localStorageService.getById<Category>(STORAGE_KEYS.CATEGORIES, productData.categoryId!);
             if (cat) {
                 localStorageService.update<Category>(STORAGE_KEYS.CATEGORIES, cat.id, { productCount: cat.productCount + 1 });
             }
           }
           setIsModalOpen(false);
           fetchData();
       } catch (error) {
           console.error("Failed to save product", error);
       } finally {
           setIsLoading(false);
       }
    }, 500);
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Unknown';

  const filteredData = data.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
  });

  // --- Components for Views ---

  // Grid Card Component
  const ProductCard = ({ product }: { product: Product }) => (
      <div className="bg-white dark:bg-[#1c2725] rounded-xl border border-gray-200 dark:border-[#283936] overflow-hidden group hover:shadow-lg transition-all">
          <div className="aspect-[4/3] bg-gray-100 dark:bg-[#111817] relative overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute top-2 right-2">
                   <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                       product.status === 'in_stock' ? 'bg-white/90 text-green-700' :
                       product.status === 'low_stock' ? 'bg-white/90 text-amber-600' :
                       'bg-white/90 text-red-600'
                   }`}>
                       {product.status.replace('_', ' ')}
                   </span>
              </div>
          </div>
          <div className="p-4">
              <div className="text-xs text-primary font-bold mb-1">{getCategoryName(product.categoryId)}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{product.name}</h3>
              <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                  <div className="text-sm text-gray-500">{product.stock} in stock</div>
              </div>
          </div>
          <div className="p-4 pt-0 flex gap-2">
              <Button size="sm" variant="outline" fullWidth onClick={() => handleEdit(product)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}>
                  <span className="material-symbols-outlined text-[18px]">delete</span>
              </Button>
          </div>
      </div>
  );

  const columns = [
      {
          header: 'Product',
          accessorKey: 'name' as const,
          render: (p: Product) => (
              <div className="flex items-center gap-3">
                  <div className="size-10 rounded-md bg-gray-100 dark:bg-[#111817] overflow-hidden">
                      <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                      <div className="font-bold text-gray-900 dark:text-white">{p.name}</div>
                      <div className="text-xs text-gray-500">{getCategoryName(p.categoryId)}</div>
                  </div>
              </div>
          )
      },
      {
          header: 'Price',
          accessorKey: 'price' as const,
          render: (p: Product) => <span className="font-mono">${p.price.toFixed(2)}</span>
      },
      {
          header: 'Status',
          accessorKey: 'status' as const,
          render: (p: Product) => (
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  p.status === 'in_stock' ? 'bg-green-100 text-green-700' :
                  p.status === 'low_stock' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
              }`}>
                  {p.status.replace('_', ' ')}
              </span>
          )
      },
      { header: 'Stock', accessorKey: 'stock' as const },
      {
          header: 'Actions',
          className: 'text-right',
          render: (p: Product) => (
            <div className="flex justify-end gap-2">
                <button onClick={() => handleEdit(p)} className="p-1 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                <button onClick={() => handleDelete(p.id)} className="p-1 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
            </div>
          )
      }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Manage catalog inventory</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} leftIcon={<span className="material-symbols-outlined">add</span>}>
          Add Product
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-[#111817] rounded-xl border border-gray-200 dark:border-[#283936] shadow-sm">
          <div className="flex-1">
              <Input 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  leftIcon={<span className="material-symbols-outlined">search</span>}
              />
          </div>
          <div className="flex gap-4">
              <div className="relative min-w-[200px]">
                   <select 
                      className="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] text-gray-900 dark:text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                   >
                       <option value="all">All Categories</option>
                       {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                   </select>
                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined pointer-events-none">expand_more</span>
              </div>
              
              <div className="flex bg-gray-100 dark:bg-[#1c2725] p-1 rounded-lg border border-gray-200 dark:border-[#3b544f]">
                  <button 
                      onClick={() => setViewMode('table')}
                      className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-[#283936] shadow text-primary' : 'text-gray-400'}`}
                  >
                      <span className="material-symbols-outlined">table_rows</span>
                  </button>
                  <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#283936] shadow text-primary' : 'text-gray-400'}`}
                  >
                      <span className="material-symbols-outlined">grid_view</span>
                  </button>
              </div>
          </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
          <TableComponent<Product>
            data={filteredData}
            columns={columns}
            keyExtractor={(p) => p.id}
            isLoading={isLoading}
            emptyMessage="No products found."
          />
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                  // Loading skeletons could go here
                  <div className="col-span-full text-center py-12 text-gray-500">Loading products...</div>
              ) : filteredData.length > 0 ? (
                  filteredData.map(p => <ProductCard key={p.id} product={p} />)
              ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">No products found.</div>
              )}
          </div>
      )}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        size="lg"
      >
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </ModalComponent>
    </div>
  );
};
