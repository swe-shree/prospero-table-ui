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
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#F8FAFC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
                >
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="mx-auto flex cursor-pointer items-center justify-center gap-2 border-0 bg-transparent font-[Inter,sans-serif] text-[#64748B]"
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
                className="px-10 py-10 text-center text-[#6B7280]"
              >
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-[#E5E7EB]">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-[10px] py-2 text-center align-middle text-[12px] leading-[13.48px] tracking-[0px] text-[#1E293B]"
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

      <div className="relative flex items-center justify-center border-t border-[#E5E7EB] bg-white px-6 py-4">
        <p className="absolute left-6 text-sm text-[#6B7280]">
          Showing{" "}
          <span className="font-boldtext-[#111827]">{showingFrom}</span>
          –
          <span className="font-bold text-[#111827]">{showingTo}</span>{" "}
          of{" "}
          <span className="font-bold text-[#111827]">
            {total.toLocaleString()}
          </span>{" "}
          documents
        </p>

        <div className="flex items-center gap-3 text-[#6B7280]">
          <button type="button" onClick={() => table.firstPage()}>
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button type="button" onClick={() => table.previousPage()}>
            <MdArrowBackIosNew />
          </button>

          <span className="text-sm text-[#6B7280]">
            Page{" "}
            <span className="font-medium text-[#111827]">{currentPage}</span>{" "}
            of{" "}
            <span className="font-medium text-[#111827]">{totalPages}</span>
          </span>

          <button type="button" onClick={() => table.nextPage()}>
            <MdArrowForwardIos />
          </button>

          <button type="button" onClick={() => table.lastPage()}>
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}