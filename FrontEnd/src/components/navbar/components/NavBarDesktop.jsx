import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { useState } from 'react';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import WalletModal from './WalletModal';
import AuthApi from '../../../api/AuthApi';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { alertConfigs } from '../../../utils/alertConfig';
import { logOut } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

/* eslint-disable react/prop-types */
export default function NavbarDesktop({
  Logo,
  navigateToHome,
  handleSearchTerm,
  isUser,
  navigateToCart,
  cartQuantity,
  navigateToLoginPage,
}) {
  const navigate = useNavigate();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const token = Cookies.get('accessToken');
  const dispatch = useDispatch();

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      navigate('/login');
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleLogOut = async () => {
    try {
      dispatch(logOut());

      const res = await AuthApi.logOut();
      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
    }
  };
  return (
    <>
      <div className="navbar-container bottom ">
        <div className="left-div">
          <img
            src={Logo}
            alt=""
            className="logo pointer"
            onClick={navigateToHome}
          />
          <input
            type="text"
            className="search-box"
            placeholder="Search book by title..."
            onChange={handleSearchTerm}
          />
          <div className="navbar-link font-18 font-bold">
            <Link to="/books">Books</Link>
          </div>
        </div>
        <div className="right-div">
          {token && isUser(token) && (
            <div className="cart-icon pointer" onClick={navigateToCart}>
              <FaShoppingCart />
            </div>
          )}
          {token && isUser(token) && (
            <p className="cart-items-count">{cartQuantity || 0}</p>
          )}
          <div className="profile-icon pointer">
            {token ? (
              <Menu
                menuButton={
                  <MenuButton>
                    <FaUserAlt />
                  </MenuButton>
                }
                transition
                // direction="left"
              >
                <MenuItem>
                  <Link
                    to="/user/profile"
                    style={{
                      color: 'black',
                      borderBottom: 'none',
                    }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setOpenWalletModal(true)}>
                  Wallet
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/user/order"
                    style={{
                      color: 'black',
                      borderBottom: 'none',
                    }}
                  >
                    My Transaction
                  </Link>
                </MenuItem>

                <MenuItem
                  style={{
                    color: 'red',
                  }}
                  onClick={handleLogOut}
                >
                  Log Out
                </MenuItem>
              </Menu>
            ) : (
              <RiLoginBoxFill onClick={navigateToLoginPage} />
            )}
          </div>
        </div>
      </div>

      <WalletModal
        openWalletModal={openWalletModal}
        setOpenWalletModal={setOpenWalletModal}
      />
      <ToastContainer />
    </>
  );
}
