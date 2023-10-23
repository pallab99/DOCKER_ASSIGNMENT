/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import "./allUser.style.scss";
import { useTable } from "react-table";
import Loader from "../../../../components/ui/loader/loader";
import { useNavigate } from "react-router-dom";
import SideBar from "../../dashboard/components/sideBar/sideBar.components";
import ReactTableComponent from "../../../../components/ui/table/table";
import UserApi from "../../../../api/UserApi";
import { useDispatch } from "react-redux";
import { hitGetAllUserAdmin } from "../../../../redux/slices/getAllUserSlice";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../utils/alertConfig";
import { useState } from "react";
import AllUserButtonGroup from "./AllUserButtonGroup.component";
const AllUser = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Balance",
        accessor: "balance",
        Cell: ({ cell }) => {
          const balance = cell.value !== undefined ? cell.value : 0;
          return <span>{balance}</span>;
        },
      },
      {
        Header: "Country",
        accessor: "address.country",
      },
      {
        Header: "City",
        accessor: "address.city",
      },
      {
        Header: "Area",
        accessor: "address.area",
      },
      {
        Header: "Street",
        accessor: "address.street",
      },
      {
        Header: "Action", // Change this header to 'Action'
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex">
            <AllUserButtonGroup
              onEditClick={onEditClick}
              btnClicked={btnClicked}
              onDeleteClick={onDeleteClick}
              row={row}
            />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const onEditClick = (userId, userData) => {
    console.log(userId);
    navigate(`/user/update/${userId}`, {
      state: { userData },
    });
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const onDeleteClick = async (userId) => {
    setBtnClicked(true);
    try {
      const res = await UserApi.deleteUserById(userId);
      dispatch(hitGetAllUserAdmin());
      console.log(res.data);
      showAlert(res.data);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };

  return (
    <div className="admin-sidebar-alignment">
      <SideBar></SideBar>
      {isLoading ? (
        <Loader />
      ) : (
        <ReactTableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          heading={"All User List"}
        />
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AllUser;
