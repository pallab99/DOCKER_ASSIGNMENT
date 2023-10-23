import './profile.style.scss';
import User from './../../../../assets/user.png';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const token = Cookies.get('accessToken');
  const [user, setUser] = useState({});
  //   const user = {
  //     _id: '65090c6212a561e7bcafc94c',
  //     email: 'majumdarp79@gamil.com',
  //     rank: 2,
  //     name: 'Pallab Majumdar',
  //     address: {
  //       country: 'BD',
  //       city: 'Dhaka',
  //       area: 'mirpur-2',
  //       street: 'road-2',
  //     },
  //     phoneNumber: 1984101170,
  //     iat: 1696762760,
  //     exp: 1696849160,
  //   };
  useEffect(() => {
    if (token) {
      setUser(jwt_decode(token));
    }
  }, [token]);
  console.log(user);
  return (
    <div className="profile-container ">
      <div className="profile-card">
        <h2 className="card-title">My Profile</h2>
        <div className="profile-icon">
          <img src={User} alt="" />
        </div>
        <div className="profile-card-text ">
          <span className="mb-5">
            <strong>Name : </strong>
            {user?.name}
          </span>
          <span className="mb-5">
            <strong>Email : </strong>
            {user?.email}
          </span>
          <span className="mb-5">
            <strong>Phone Number : </strong>
            {user?.phoneNumber}
          </span>
          <span className="mb-5">
            <strong>Location: : </strong>
            {user?.address?.street}, {user?.address?.area},{' '}
            {user?.address?.city}, {user?.address?.country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
