import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialOrders, initialCustomers } from '../data/initialData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fvr_theme') || 'dark';
  });

  // Apply dark mode class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fvr_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('fvr_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('fvr_products', JSON.stringify(products));
  }, [products]);

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fvr_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fvr_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State (Array of product IDs)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fvr_wishlist');
    return saved ? JSON.parse(saved) : ['fvr-101', 'fvr-103'];
  });

  useEffect(() => {
    localStorage.setItem('fvr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fvr_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('fvr_orders', JSON.stringify(orders));
  }, [orders]);

  // Customers State
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('fvr_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  useEffect(() => {
    localStorage.setItem('fvr_customers', JSON.stringify(customers));
  }, [customers]);

  // Admin Users Database State
  const defaultAdminUsers = [
    {
      id: 'admin-001',
      name: 'Super Admin',
      email: 'admin@fashionvillaroyal.com',
      password: 'admin123',
      role: 'Super Admin',
      joinDate: '2026-01-01',
      status: 'Active'
    }
  ];

  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('fvr_admin_users');
    return saved ? JSON.parse(saved) : defaultAdminUsers;
  });

  useEffect(() => {
    localStorage.setItem('fvr_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Navigation and View state
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('fvr-101');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // King Burger Style Order Mode State (Delivery vs Dine-In)
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' or 'Dine-In'
  const [selectedOutlet, setSelectedOutlet] = useState('Bandra West Flagship Restaurant');
  const [tableNumber, setTableNumber] = useState('Table #4');

  // Admin Auth & Current Admin User State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('fvr_admin_logged_in') === 'true';
  });

  const [currentAdminUser, setCurrentAdminUser] = useState(() => {
    const saved = localStorage.getItem('fvr_current_admin_user');
    return saved ? JSON.parse(saved) : defaultAdminUsers[0];
  });

  const registerAdmin = ({ name, email, password, role = 'Inventory Manager', masterKey }) => {
    if (masterKey !== 'ROYAL-ADMIN-2026') {
      return { success: false, message: 'Invalid Admin Master Key. Required code: ROYAL-ADMIN-2026' };
    }

    const existing = adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An Admin account with this email already exists in the database!' };
    }

    const newAdmin = {
      id: 'admin-' + Date.now(),
      name,
      email,
      password,
      role,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    const updated = [newAdmin, ...adminUsers];
    setAdminUsers(updated);
    setCurrentAdminUser(newAdmin);
    setIsAdminLoggedIn(true);
    localStorage.setItem('fvr_admin_logged_in', 'true');
    localStorage.setItem('fvr_current_admin_user', JSON.stringify(newAdmin));

    return { success: true, message: 'Admin Registration Successful! Welcome to the Admin Desk.' };
  };

  const loginAdmin = (email, password) => {
    const foundAdmin = adminUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundAdmin) {
      setIsAdminLoggedIn(true);
      setCurrentAdminUser(foundAdmin);
      localStorage.setItem('fvr_admin_logged_in', 'true');
      localStorage.setItem('fvr_current_admin_user', JSON.stringify(foundAdmin));
      return { success: true, message: `Welcome back, ${foundAdmin.name}!` };
    }

    return { success: false, message: 'Invalid email or password. Use demo credentials or register a new admin.' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
    localStorage.removeItem('fvr_admin_logged_in');
    localStorage.removeItem('fvr_current_admin_user');
    setCurrentView('home');
  };

  const deleteAdminUser = (adminId) => {
    if (adminUsers.length <= 1) {
      return { success: false, message: 'Cannot delete the primary super admin account.' };
    }
    setAdminUsers(prev => prev.filter(u => u.id !== adminId));
    return { success: true, message: 'Admin user revoked from database.' };
  };

  // Product CRUD
  const addProduct = (newProdData) => {
    const newProduct = {
      ...newProdData,
      id: 'fvr-' + Date.now(),
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      published: true
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const togglePublishProduct = (id) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, published: !p.published } : p)));
  };

  const setMainProductImage = (productId, imageIndex) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, mainImageIndex: imageIndex } : p)));
  };

  const reorderProductImages = (productId, newImagesList) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, images: newImagesList } : p)));
  };

  // Cart Functions
  const addToCart = (product, color, size, quantity = 1, customPrice = null) => {
    const priceToUse = customPrice || product.salePrice || product.regularPrice;
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.color === color && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const mainImg = product.images[product.mainImageIndex || 0] || product.images[0];
        return [
          ...prev,
          {
            cartId: `${product.id}-${color}-${size}`,
            productId: product.id,
            name: product.name,
            price: priceToUse,
            regularPrice: product.regularPrice,
            quantity,
            color,
            size,
            image: mainImg
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Order Functions
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  // Navigation helpers
  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (category = 'All') => {
    setSelectedCategory(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublishProduct,
        setMainProductImage,
        reorderProductImages,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        customers,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        navigateToShop,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        orderType,
        setOrderType,
        selectedOutlet,
        setSelectedOutlet,
        tableNumber,
        setTableNumber,
        isAdminLoggedIn,
        currentAdminUser,
        adminUsers,
        registerAdmin,
        loginAdmin,
        logoutAdmin,
        deleteAdminUser
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
