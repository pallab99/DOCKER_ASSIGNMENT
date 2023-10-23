import { FaUserAlt } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { MdDiscount, MdShoppingCart } from 'react-icons/md';
import './sideBar.style.scss';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import { alertConfigs } from '../../../../../utils/alertConfig';
import AuthApi from '../../../../../api/AuthApi';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../../redux/slices/authSlice';
const SideBar = () => {
  const navigate = useNavigate();
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
    <div className="sideBar-container">
      <Sidebar
        style={{
          height: '100vh',
          position: 'fixed',
          zIndex: '200000',
          paddingTop: '5%',
        }}
        width="200px"
        // backgroundColor="gray"
      >
        <p className="font-30 font-bold text-center mb-10">Admin Dashboard</p>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <SubMenu label="Books" icon={<IoBookSharp />}>
            <MenuItem component={<Link to="/admin/dashboard" />}>
              All Books
            </MenuItem>
            <MenuItem component={<Link to="/book/create" />}>
              Add Books
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaUserAlt />} component={<Link to="/user/all" />}>
            All User
          </MenuItem>
          <SubMenu label="Discount" icon={<MdDiscount />}>
            <MenuItem component={<Link to="/discount/all" />}>
              All Discount
            </MenuItem>
            <MenuItem component={<Link to="/book/add-discount" />}>
              Add Discount
            </MenuItem>
          </SubMenu>
          <MenuItem
            component={<Link to="/transaction/all" />}
            icon={<MdShoppingCart />}
          >
            All transaction
          </MenuItem>
          <SubMenu label="Log Out" icon={<RiLogoutBoxRFill />}>
            <MenuItem
              style={{
                color: 'red',
              }}
              onClick={handleLogOut}
            >
              Log Out
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <ToastContainer />
    </div>
  );
};

export default SideBar;
