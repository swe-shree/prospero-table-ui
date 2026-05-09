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
    <div className="w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse font-[Inter,sans-serif]">
          <thead className="bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap border-r border-[#E5E7EB] px-[12px] py-[14px] text-left align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B] last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex w-full items-center justify-between gap-2 border-0 bg-transparent p-0 text-left font-[Inter,sans-serif] text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
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
                  className="px-10 py-10 text-center text-sm text-[#64748B]"
                >
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-[#E5E7EB] last:border-b-0">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-r border-[#E5E7EB] px-[12px] py-[14px] align-middle text-[12px] font-normal leading-[18px] text-[#1E293B] last:border-r-0"
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
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-4 font-[Inter,sans-serif]">
        <p className="text-[14px] font-normal text-[#64748B]">
          Showing{" "}
          <span className="font-medium text-[#111827]">{showingFrom}</span>
          –
          <span className="font-medium text-[#111827]">{showingTo}</span>{" "}
          of{" "}
          <span className="font-medium text-[#111827]">
            {total.toLocaleString()}
          </span>{" "}
          documents
        </p>

        <div className="flex items-center gap-3 text-[14px] text-[#64748B]">
          <button
            type="button"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdArrowBackIosNew />
          </button>

          <span className="whitespace-nowrap text-[14px] text-[#64748B]">
            Page{" "}
            <span className="font-medium text-[#111827]">{currentPage}</span>{" "}
            of{" "}
            <span className="font-medium text-[#111827]">{totalPages}</span>
          </span>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>

          <button
            type="button"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}