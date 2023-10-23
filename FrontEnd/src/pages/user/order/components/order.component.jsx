/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import ReactTableComponent from '../../../../components/ui/table/table';
import './order.style.scss';
import Loader from '../../../../components/ui/loader/loader';
import { formatDate } from '../../../../helper/dateFormatter';
const Order = ({ data, isLoading }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
      },
      {
        Header: 'Total Price',
        accessor: 'totalPrice',
      },
      {
        Header: 'Total Quantity',
        accessor: 'totalQuantity', // Unique accessor
        Cell: ({ row }) => (
          <div>
            {row.original.books.reduce(
              (totalQuantity, book) => totalQuantity + book.quantity,
              0
            )}
          </div>
        ),
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => <div>{formatDate(value)}</div>,
      },
      {
        Header: 'Books',
        accessor: 'bookTitles', // Unique accessor
        Cell: ({ row }) => (
          <div>
            {row.original.books.map((book, index) => (
              <span key={book?.book?._id}>
                {book?.book?.title}
                {index < row.original.books.length - 1 ? ' , ' : ''}
              </span>
            ))}
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
  return (
    <div className="user-order-list full-height">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="items-center-grid full-height">
              <p className="text-center font-30 font-bold ">No item found</p>
            </div>
          ) : (
            <ReactTableComponent
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              heading={'All Order List'}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Order;
