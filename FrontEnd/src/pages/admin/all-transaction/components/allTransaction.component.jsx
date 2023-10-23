/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import "./allTransaction.style.scss";
import { useTable } from "react-table";
import SideBar from "../../dashboard/components/sideBar/sideBar.components";
import Loader from "../../../../components/ui/loader/loader";
import ReactTableComponent from "../../../../components/ui/table/table";
import { formatDate } from "../../../../helper/dateFormatter";

const AllTransaction = ({ data, isLoading }) => {
  console.log("data", data);
  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "user",
      },
      {
        Header: "User Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
      },
      {
        Header: "Total Price",
        accessor: "totalPrice",
      },
      {
        Header: "Order Date",
        accessor: "createdAt",
        Cell: ({ value }) => <div>{formatDate(value)}</div>,
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="admin-sidebar-alignment">
      <SideBar />
      {isLoading ? (
        <Loader />
      ) : (
        <ReactTableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          heading={"All transaction List"}
        />
      )}
    </div>
  );
};

export default AllTransaction;
