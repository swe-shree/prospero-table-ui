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

  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#F8FAFC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-10 py-5 text-center text-[12px] font-semibold uppercase tracking-wide text-[#475569]"
                >
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="mx-auto flex items-center justify-center gap-2"
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>

                      {header.column.getCanSort() && (
                        <span className="text-[11px] text-[#94A3B8]">
                          {header.column.getIsSorted() === "asc" ? (
                            <FaSortUp />
                          ) : header.column.getIsSorted() === "desc" ? (
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
                className="px-10 py-10 text-center text-sm text-[#6B7280]"
              >
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#E5E7EB] transition hover:bg-[#F9FAFB]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-10 py-5 text-center text-[13px] font-normal text-[#1E293B]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-6 py-4">
        <p className="text-sm text-[#6B7280]">
          Showing{" "}
          <span className="font-bold text-[#111827]">{showingFrom}</span>
          <span className="font-bold text-[#111827]">–</span>
          <span className="font-bold text-[#111827]">{showingTo}</span> of{" "}
          <span className="font-bold text-[#111827]">
            {total.toLocaleString()}
          </span>{" "}
          documents
        </p>

        <div className="flex items-center gap-3 text-sm text-[#6B7280]">
          <button
            type="button"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdArrowBackIosNew />
          </button>

          <span className="text-sm text-[#6B7280]">
            Page{" "}
            <span className="font-bold text-[#111827]">{currentPage}</span> of{" "}
            <span className="font-bold text-[#111827]">{totalPages}</span>
          </span>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>

          <button
            type="button"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}