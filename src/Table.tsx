"use client";

import { flexRender, type ColumnDef } from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useTableCore } from "@prospero/table-core";

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  total?: number;
};

export function Table<TData extends object>({
  data,
  columns,
  pageSize = 10,
  total = data.length,
}: TableProps<TData>) {
  const table = useTableCore({
    data,
    columns,
    pagination: {
      pageIndex: 0,
      pageSize,
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: true,
  });

  const pageIndex = table.getState().pagination.pageIndex;

  const currentPage = pageIndex + 1;

  const totalPages = table.getPageCount();

  const showingFrom =
    total === 0 ? 0 : pageIndex * pageSize + 1;

  const showingTo = Math.min(
    (pageIndex + 1) * pageSize,
    total
  );

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead
          style={{
            backgroundColor: "#F8FAFC",
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "10px 10px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#475569",
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        margin: "0 auto",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#475569",
                      }}
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>

                      {header.column.getCanSort() && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#94A3B8",
                          }}
                        >
                          {header.column.getIsSorted() ===
                          "asc" ? (
                            <FaSortUp />
                          ) : header.column.getIsSorted() ===
                            "desc" ? (
                            <FaSortDown />
                          ) : (
                            <FaSort />
                          )}
                        </span>
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#6B7280",
                }}
              >
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                    padding: "8px 10px",  
                      textAlign: "center",
                      color: "#1E293B",
                      fontSize: "13px",
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 24px",
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Showing{" "}
          <span
            style={{
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {showingFrom}
          </span>
          –
          <span
            style={{
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {showingTo}
          </span>{" "}
          of{" "}
          <span
            style={{
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {total.toLocaleString()}
          </span>{" "}
          documents
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#6B7280",
          }}
        >
          <button onClick={() => table.firstPage()}>
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button onClick={() => table.previousPage()}>
            <MdArrowBackIosNew />
          </button>

          <span>
            Page{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {currentPage}
            </span>{" "}
            of{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {totalPages}
            </span>
          </span>

          <button onClick={() => table.nextPage()}>
            <MdArrowForwardIos />
          </button>

          <button onClick={() => table.lastPage()}>
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}