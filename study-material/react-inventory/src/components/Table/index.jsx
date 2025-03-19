import React from "react";

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <div className="min-w-[800px] overflow-hidden shadow-lg">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`text-white text-sm ${
                    rowIndex % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  }`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(row[col.field], row, rowIndex)
                        : row[col.field]}
                    </td>
                  ))}
                  {actions && (
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="border border-gray-300 px-4 py-2 text-center text-white"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
