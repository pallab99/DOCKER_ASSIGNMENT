import { Link } from 'react-router-dom';
import Button from '../ui/button/button.component';
import './footer.style.scss';
AiTwotoneMail;
import {
  AiTwotoneMail,
  AiTwotonePhone,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai';
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="email-div">
        <div className="email-div-header mb-5">
          <AiTwotoneMail />
          <span className="font-bold mb-5">
            GET SPECIAL DISCOUNTS IN YOUR INBOX
          </span>
        </div>
        <div className="subscribe-box mb-5">
          <input type="text" placeholder="Enter Email to get updates" />
          <Button
            className={'subscribe-now-btn'}
            text={'Subscribe Now'}
          ></Button>
        </div>
      </div>
      <div className="phone-div mb-5">
        <div className="phone-div-header mb-5">
          <AiTwotonePhone />
          <span className="font-bold mb-5">
            FOR ANY HELP YOU MAY CALL US AT
          </span>
        </div>
        <p className="mb-5">+8801984101170 </p>
        <p className="mb-5">Open 24 Hours a Day, 7 Days a week</p>
      </div>

      <div className="social-media-div mb-5">
        <p className="mb-5">Connect to the social media</p>
        <div className="social-media-icon-wrapper">
          <Link
            to="https://www.facebook.com/pallab.majumdar.99"
            style={{ color: 'white' }}
          >
            <div className="social-media-icon">
              <AiFillFacebook></AiFillFacebook>
            </div>
          </Link>
          <Link
            to="https://www.instagram.com/pallab.majumdar/"
            style={{ color: 'white' }}
          >
            <div className="social-media-icon">
              <AiFillInstagram></AiFillInstagram>
            </div>
          </Link>
          <Link
            to="https://www.linkedin.com/in/pallab-majumdar/"
            style={{ color: 'white' }}
          >
            <div className="social-media-icon">
              <AiFillLinkedin></AiFillLinkedin>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
