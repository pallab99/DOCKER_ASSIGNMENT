import FeaturedBook from "./components/FeaturedBook/featuredBook.component";
import Collections from "./components/collections/collections.component.jsx";
import useGetFeaturedBooks from "../../hooks/book/useGetFeaturedBook";
import Banner from "./components/banner/banner.components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { featuredBooks, loading } = useGetFeaturedBooks();
  const admin = useSelector((state) => state?.auth?.userData?.rank);
  const navigate = useNavigate();
  if (admin === 1) {
    navigate("/admin/dashboard");
  }
  return (
    <>
      <Banner></Banner>
      <FeaturedBook featuredBook={featuredBooks} loading={loading} />
      <Collections
        collectionBook={featuredBooks}
        loading={loading}
      ></Collections>
    </>
  );
};

export default HomePage;
