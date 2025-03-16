import React, { useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import Routes from './pages/Routes';
import ScreenLoader from './components/ScreenLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAppLoading } = useSelector(store => store.authSlice)


  useEffect(() => {
    dispatch(fetchUser()); // Fetch user on page load
  }, [dispatch]);
  return (
    <>
      {!isAppLoading ? <Routes /> : <ScreenLoader />}
    </>
  );
}

export default App;
