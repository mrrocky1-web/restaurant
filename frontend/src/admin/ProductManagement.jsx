import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductFormModal } from './ProductFormModal';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const ProductManagement = () => {
  const { products, togglePublishProduct, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white">
            PRODUCT INVENTORY MANAGEMENT
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Inventory: <strong className="text-amber-600 dark:text-amber-400">{products.length} Products</strong>
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-xs uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Title or SKU code..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-xs font-bold"
        >
          <option value="All">All Categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/50 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Photos</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {filteredProducts.map((product) => {
                const mainImg = product.images[product.mainImageIndex || 0] || product.images[0];
                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={mainImg}
                          alt=""
                          className="w-12 h-14 object-cover rounded-xl border border-gray-200 dark:border-slate-700 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{product.name}</h4>
                          <span className="text-[10px] text-gray-400">{product.subcategory}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                      {product.sku}
                    </td>
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {product.category}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white">
                        ₹{(product.salePrice || product.regularPrice).toLocaleString('en-IN')}
                      </div>
                      {product.salePrice && product.salePrice < product.regularPrice && (
                        <div className="text-[10px] text-gray-400 line-through">
                          ₹{product.regularPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${product.stock <= 5 ? 'text-rose-500' : 'text-emerald-600'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-500">
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold">
                        <ImageIcon className="w-3 h-3" />
                        {product.images?.length || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePublishProduct(product.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1 ${
                          product.published
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-gray-200 dark:bg-slate-800 text-gray-500'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {product.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{product.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
};
