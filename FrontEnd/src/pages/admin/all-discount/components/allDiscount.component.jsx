/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import SideBar from '../../dashboard/components/sideBar/sideBar.components';
import './allDiscount.style.scss';
import Loader from '../../../../components/ui/loader/loader';
import ReactTableComponent from '../../../../components/ui/table/table';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import discountApi from './../../../../api/DiscountApi';
import { ToastContainer, toast } from 'react-toastify';
import { alertConfigs } from '../../../../utils/alertConfig';
import { formatDate } from '../../../../helper/dateFormatter';
import AllTransactionButtonGroup from './AllTransactionButtonGroup.component';
const AllDisCount = ({ data, loading, count, setCount }) => {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Discount Percentage',
        accessor: 'discountPercentage',
      },
      {
        Header: 'Books',
        accessor: 'bookIds',
        Cell: ({ value }) => (
          <div>{value.map((book) => book.title).join(', ')}</div>
        ),
      },

      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => <div>{formatDate(value)}</div>,
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: ({ value }) => <div>{formatDate(value)}</div>,
      },
      {
        Header: 'Country',
        accessor: 'counties',
        Cell: ({ value }) => <div>{value.map((ele) => ele).join(', ')}</div>,
      },

      {
        Header: 'Action', // Change this header to 'Action'
        accessor: 'action',
        Cell: ({ row }) => (
          <div className="flex">
            <AllTransactionButtonGroup
              row={row}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
        ),
      },
    ],
    []
  );
  const onEditClick = (discountId, data) => {
    console.log('dis edit btn', data);
    navigate(`/book/update-discount/${discountId}`, { state: data });
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const onDeleteClick = async (discountId) => {
    try {
      const res = await discountApi.deleteDiscountById(discountId);
      setCount(count + 1);
      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
    }
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="admin-sidebar-alignment">
      <SideBar></SideBar>
      {loading ? (
        <Loader />
      ) : (
        <ReactTableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          heading={'All Discount List'}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AllDisCount;
