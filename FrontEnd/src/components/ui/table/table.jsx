/* eslint-disable react/prop-types */
export default function ReactTableComponent(props) {
  return (
    <>
      <div className="table-container mt-20 mb-20">
        <p className="font-bold font-30 text-center mb-20">{props.heading}</p>
        <table {...props.getTableProps()} className="user-table">
          <thead>
            {props.headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={index} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...props.getTableBodyProps()}>
            {props.rows.map((row, index) => {
              props.prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
