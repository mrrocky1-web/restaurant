import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLoginModal } from './admin/AdminLoginModal';

const MainContent = () => {
  const { currentView, isAdminLoggedIn } = useStore();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // If viewing admin dashboard and logged in, render full admin dashboard
  if (currentView.startsWith('admin-') && isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar onOpenAdminLogin={() => setIsAdminModalOpen(true)} />

      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'orders' && <OrdersPage />}
      </main>

      <Footer />
      <CartDrawer />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

export default App;
