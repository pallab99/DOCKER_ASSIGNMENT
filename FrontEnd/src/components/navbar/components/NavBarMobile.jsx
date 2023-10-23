/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import WalletModal from './WalletModal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { alertConfigs } from '../../../utils/alertConfig';
import AuthApi from '../../../api/AuthApi';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/slices/authSlice';
export default function NavBarMobile({
  Logo,
  navigateToHome,
  isUser,
  navigateToCart,
  cartQuantity,
  navigateToLoginPage,
  handleSearchTerm,
}) {
  const navigate = useNavigate();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const token = Cookies.get('accessToken');
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      navigate('/');
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const dispatch = useDispatch();
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
    <div>
      <div className="navbar-container bottom">
        <div className="left-div-mobile">
          <img src={Logo} alt="" className="logo" onClick={navigateToHome} />
          <div className="cart-profile">
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
        <div className="right-div-mobile mb-10">
          <input
            type="text"
            className="search-box"
            placeholder="Search book by title..."
            onChange={handleSearchTerm}
          />
        </div>
      </div>
      <WalletModal
        openWalletModal={openWalletModal}
        setOpenWalletModal={setOpenWalletModal}
      />
    </div>
  );
}
