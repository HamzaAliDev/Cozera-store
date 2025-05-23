import React, { useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import Routes from './pages/Routes';
import ScreenLoader from './components/ScreenLoader';
import { useAuthContext } from './contexts/AuthContext';
import { useProductStore } from './store/useProductStore';
import { useWishlistStore } from './store/useWishlistStore';
import { useCartStore } from './store/useCartStore';


function App() {
  const { isAppLoading, user } = useAuthContext();
  const { fetchProducts } = useProductStore();
  const { initializeWishlist } = useWishlistStore();
  const { initializeCart } = useCartStore();



  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (user) {
      initializeWishlist(user._id);
      initializeCart(user._id);
    }
  }, [user, initializeWishlist, initializeCart])

  if (isAppLoading) {
    return <ScreenLoader />
  }

  return <Routes />
}

export default App;
