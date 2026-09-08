import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Star,
  GripVertical,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Tag
} from 'lucide-react';

export const ProductFormModal = ({ isOpen, onClose, productToEdit = null }) => {
  const { addProduct, updateProduct } = useStore();

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Women');
  const [subcategory, setSubcategory] = useState('Bridal Lehengas');
  const [regularPrice, setRegularPrice] = useState(25000);
  const [salePrice, setSalePrice] = useState(19999);
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [stock, setStock] = useState(10);
  const [description, setDescription] = useState('');

  // 📸 Photos state array
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Variant Options
  const [colorsInput, setColorsInput] = useState('Crimson Red, Emerald Green, Royal Blue');
  const [sizesInput, setSizesInput] = useState('S, M, L, XL');

  // Variant Customization matrix
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (productToEdit) {
      setSku(productToEdit.sku || '');
      setName(productToEdit.name || '');
      setCategory(productToEdit.category || 'Women');
      setSubcategory(productToEdit.subcategory || '');
      setRegularPrice(productToEdit.regularPrice || 0);
      setSalePrice(productToEdit.salePrice || 0);
      setPublished(productToEdit.published ?? true);
      setFeatured(productToEdit.featured ?? false);
      setStock(productToEdit.stock || 10);
      setDescription(productToEdit.description || '');
      setImages(productToEdit.images || []);
      setMainImageIndex(productToEdit.mainImageIndex || 0);
      setColorsInput((productToEdit.colors || []).join(', '));
      setSizesInput((productToEdit.sizes || []).join(', '));
      setVariants(productToEdit.variants || []);
    } else {
      // Auto generate SKU for new product
      setSku('FVR-RYL-' + Math.floor(100 + Math.random() * 900));
      setName('');
      setCategory('Women');
      setSubcategory('Bridal Lehengas');
      setRegularPrice(35000);
      setSalePrice(28999);
      setPublished(true);
      setFeatured(true);
      setStock(15);
      setDescription('Handcrafted royal couture attire embellished with fine threadwork.');
      setImages([
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
      ]);
      setMainImageIndex(0);
      setColorsInput('Crimson Red, Emerald Green');
      setSizesInput('S, M, L');
      setVariants([
        { color: 'Crimson Red', size: 'S', price: 28999, stock: 5 },
        { color: 'Crimson Red', size: 'M', price: 28999, stock: 5 },
        { color: 'Emerald Green', size: 'M', price: 29999, stock: 5 }
      ]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Add photo URL
  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  // Handle Photo File Upload (Convert local device files to Data URLs)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input value so same file can be selected again if needed
    e.target.value = '';
  };

  // Remove photo
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  // Move photo left/right
  const moveImage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setImages(updated);

    // Update main image index if moved
    if (mainImageIndex === fromIndex) {
      setMainImageIndex(toIndex);
    } else if (mainImageIndex === toIndex) {
      setMainImageIndex(fromIndex);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    moveImage(draggedIndex, index);
    setDraggedIndex(null);
  };

  // Handle Quick Add 10 Preset Royal Photos
  const handleLoadSamplePhotos = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80'
    ];
    setImages(samplePhotos);
  };

  // Submit product form
  const handleSubmit = (e) => {
    e.preventDefault();

    const colorsArr = colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const sizesArr = sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      sku,
      name,
      category,
      subcategory,
      regularPrice: Number(regularPrice),
      salePrice: Number(salePrice),
      published,
      featured,
      stock: Number(stock),
      description,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'],
      mainImageIndex,
      colors: colorsArr,
      sizes: sizesArr,
      variants,
      specifications: [
        { key: 'Fabric', value: 'Royal Silk / Velvet' },
        { key: 'Care', value: 'Dry Clean Only' }
      ]
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white flex items-center justify-between border-b border-amber-500/30">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest block">
              Admin Product Catalog Manager
            </span>
            <h2 className="font-cinzel text-xl font-bold">
              {productToEdit ? `Edit Product: ${productToEdit.name}` : '➕ Add New Royal Couture Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[80vh] overflow-y-auto text-xs">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
              1. Basic Product Information & SKU
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">🏷️ SKU Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                    className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-mono font-bold text-amber-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Product Title / Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maharani Velvet Bridal Lehenga"
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Subcategory *</label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="e.g. Bridal Lehengas / Sherwanis"
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing in Rupees (₹) */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
              2. Regular & Sale Price (Formatted in Rupees ₹)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">💰 Regular Price (₹) *</label>
                <input
                  type="number"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(Number(e.target.value))}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">🔥 Sale / Discount Price (₹)</label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-amber-500/50 rounded-xl font-extrabold text-amber-600 dark:text-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 📸 Upload 10, 15, 20+ Photos & Drag/Drop Reordering */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2 gap-2">
              <div>
                <h3 className="font-cinzel text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  3. 📸 Product Photo Gallery ({images.length} Photos)
                </h3>
                <p className="text-[11px] text-gray-400">
                  🖼️ Drag and drop thumbnails to reorder photo display sequence. ⭐ Click badge to pick main featured cover image.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLoadSamplePhotos}
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500/20"
              >
                + Load 12 Royal Photo Set
              </button>
            </div>

            {/* Add Image URL bar & Direct File Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-8 flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste Image URL (https://...)"
                  className="flex-1 p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-slate-900 dark:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-colors whitespace-nowrap"
                >
                  + Add URL
                </button>
              </div>

              {/* Direct Device File Upload Button */}
              <div className="sm:col-span-4">
                <label className="w-full flex items-center justify-center gap-2 p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl cursor-pointer shadow-md transition-all text-xs">
                  <Upload className="w-4 h-4" />
                  <span>📁 Upload Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Drag and Drop Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {images.map((imgUrl, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`relative group aspect-[3/4] rounded-2xl overflow-hidden border-2 bg-gray-100 dark:bg-slate-800 cursor-move transition-all ${
                    mainImageIndex === index
                      ? 'border-amber-500 ring-2 ring-amber-500/50 scale-105 shadow-md'
                      : 'border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />

                  {/* Drag Handle Icon */}
                  <div className="absolute top-1 left-1 p-1 bg-slate-950/70 text-white rounded">
                    <GripVertical className="w-3 h-3" />
                  </div>

                  {/* Main / Featured Image Selector Button */}
                  <button
                    type="button"
                    onClick={() => setMainImageIndex(index)}
                    className={`absolute bottom-1 left-1 right-1 py-1 rounded text-[9px] font-extrabold flex items-center justify-center gap-1 transition-colors ${
                      mainImageIndex === index
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950/80 text-gray-300 hover:bg-amber-500 hover:text-slate-950'
                    }`}
                  >
                    <Star className={`w-3 h-3 ${mainImageIndex === index ? 'fill-slate-950' : ''}`} />
                    <span>{mainImageIndex === index ? '⭐ MAIN' : 'Set Main'}</span>
                  </button>

                  {/* Delete Image Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  {/* Reorder Arrows */}
                  <div className="absolute inset-y-0 inset-x-0 flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 pointer-events-none">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index - 1)}
                        className="pointer-events-auto bg-slate-900/90 text-white p-1 rounded-full hover:bg-amber-500 hover:text-slate-950"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index + 1)}
                        className="pointer-events-auto bg-slate-900/90 text-white p-1 rounded-full hover:bg-amber-500 hover:text-slate-950"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Color & Size Variants & Individual Price Customization */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
              4. 🎨 Variants & Individual Price/Stock Customization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Color Variants (Comma Separated)</label>
                <input
                  type="text"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  placeholder="Crimson Red, Emerald Green, Royal Blue"
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Size Variants (Comma Separated)</label>
                <input
                  type="text"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="S, M, L, XL"
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Description & Visibility */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
              5. 📝 Description & Publish Settings
            </h3>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Product Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <span>👁️ Publish Product on Client Site</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <span>👑 Feature in Royal Choice Homepage</span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold uppercase tracking-wider shadow-lg"
            >
              Save Product & Update Catalogue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
