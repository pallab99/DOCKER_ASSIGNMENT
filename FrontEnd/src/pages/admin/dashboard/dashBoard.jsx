import useGetAllBooksAdmin from '../../../hooks/book/useGetAllBooksAdmin';
import AdminALLBooks from '../allBooks/components/allBooks.components';
import SideBar from './components/sideBar/sideBar.components';

const DashBoardPage = () => {
  const { data, loading } = useGetAllBooksAdmin();
  return (
    <div className="dashboard-container">
      <SideBar />
      <AdminALLBooks data={data} isLoading={loading} />
    </div>
  );
};

export default DashBoardPage;
