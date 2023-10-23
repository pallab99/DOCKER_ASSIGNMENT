/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Logo from './../../assets/logo-1.png';
import './navbar.style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { isUser } from '../../helper/tokenAuthorizer';
import CartApi from '../../api/CartApi';
import { calculateItemQuantity } from '../../redux/slices/cartSlice';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { searchTerm } from '../../redux/slices/getAllBooksSlice';
import NavbarDesktop from './components/NavBarDesktop';
import NavBarMobile from './components/NavBarMobile';

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const hitCartApi = useSelector((state) => state.cart.callCartApi);
  const cartQuantity = useSelector((state) => state.cart.itemQuantity);
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  const handleSearchTerm = (e) => {
    const term = e.target.value;
    dispatch(searchTerm(term));
  };
  const token = Cookies.get('accessToken');
  useEffect(() => {
    if (token) {
      setUser(true);
      getCartItems();
    }
  }, [hitCartApi, token]);

  const getCartItems = async () => {
    console.log('hello navbar');
    try {
      console.log('navbar success');
      const res = await CartApi.cartByUser();
      dispatch(
        calculateItemQuantity(res?.data?.data?.cartExistsForUser?.books.length)
      );
    } catch (error) {
      console.log('navbar error');
      console.log(error.response);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowWidth]);

  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToCart = () => {
    navigate('/cart');
  };
  const navigateToLoginPage = () => {
    navigate('/login');
  };
  return (
    <>
      {!mobile ? (
        <NavbarDesktop
          Logo={Logo}
          navigateToHome={navigateToHome}
          handleSearchTerm={handleSearchTerm}
          isUser={isUser}
          token={token}
          navigateToCart={navigateToCart}
          cartQuantity={cartQuantity}
          navigateToLoginPage={navigateToLoginPage}
        />
      ) : (
        <NavBarMobile
          Logo={Logo}
          navigateToHome={navigateToHome}
          isUser={isUser}
          token={token}
          navigateToCart={navigateToCart}
          cartQuantity={cartQuantity}
          navigateToLoginPage={navigateToLoginPage}
          handleSearchTerm={handleSearchTerm}
        />
      )}
    </>
  );
};

export default Navbar;
