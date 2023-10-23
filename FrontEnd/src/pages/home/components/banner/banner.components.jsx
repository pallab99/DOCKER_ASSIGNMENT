import "./banner.style.scss";
import BannerIMG from "./../../../../assets/banner.svg";
const Banner = () => {
  return (
    <div className="banner-container mt-20">
      <img src={BannerIMG} alt="" className="banner-img" />
    </div>
  );
};

export default Banner;
