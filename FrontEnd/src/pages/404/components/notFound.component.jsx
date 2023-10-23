import './notFound.style.scss';
import Button from './../../../components/ui/button/button.component';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <div className="not-found-container">
      <h1>Look like you are come to wrong place</h1>
      <Button
        className={'navigate-to-home mt-20'}
        text={'Go to home'}
        handleButtonClick={navigateToHome}
      ></Button>
    </div>
  );
};

export default NotFound;
