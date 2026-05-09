"use client";

import { useState } from "react";
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
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [pageIndex, setPageIndex] = useState(0);

  const table = useTableCore({
    data,
    columns,
    pagination: {
      pageIndex,
      pageSize,
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: true,
  });

  const currentPage = pageIndex + 1;
  const totalPages = table.getPageCount();

  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min((pageIndex + 1) * pageSize, total);

  const rows = table.getRowModel().rows;

  const allSelected =
    rows.length > 0 && rows.every((row) => selectedRows[row.id]);

  function toggleAllRows() {
    if (allSelected) {
      setSelectedRows({});
      return;
    }

    const next: Record<string, boolean> = {};
    rows.forEach((row) => {
      next[row.id] = true;
    });

    setSelectedRows(next);
  }

  function toggleRow(rowId: string) {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }

  function goToFirstPage() {
    table.firstPage();
    setPageIndex(0);
  }

  function goToPreviousPage() {
    table.previousPage();
    setPageIndex((prev) => Math.max(prev - 1, 0));
  }

  function goToNextPage() {
    table.nextPage();
    setPageIndex((prev) => Math.min(prev + 1, totalPages - 1));
  }

  function goToLastPage() {
    table.lastPage();
    setPageIndex(totalPages - 1);
  }

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead className="bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                <th className="w-12  px-[10px] py-[10px] text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAllRows}
                    className="h-4 w-4 rounded border-[#CBD5E1]"
                  />
                </th>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-[10px] py-[10px] text-left align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex w-full items-center justify-between gap-2 bg-transparent p-0 text-left"
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
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-sm text-[#64748B]"
                >
                  No data found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] last:border-b-0"
                >
                  <td className="px-[10px] py-[8px] text-center">
                    <input
                      type="checkbox"
                      checked={Boolean(selectedRows[row.id])}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 rounded border-[#CBD5E1]"
                    />
                  </td>

                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-[10px] py-[8px] align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]"
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

      <div className="relative flex items-center border-t border-[#E5E7EB] bg-white px-5 py-4">
        <p className="text-sm text-[#64748B]">
          Showing{" "}
          <span className="font-bold text-[#111827]">
            {showingFrom}–{showingTo}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#111827]">
            {total.toLocaleString()}
          </span>{" "}
          documents
        </p>

        <div className="absolute left-1/2 flex -translate-x-1/2 flex items-center gap-3 text-sm text-[#64748B]">
          <button
            type="button"
            disabled={pageIndex === 0}
            onClick={goToFirstPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            type="button"
            disabled={pageIndex === 0}
            onClick={goToPreviousPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowBackIosNew />
          </button>

          <p>
            Page{" "}
            <span className="font-bold text-[#111827]">{currentPage}</span>{" "}
            of{" "}
            <span className="font-bold text-[#111827]">{totalPages}</span>
          </p>

          <button
            type="button"
            disabled={pageIndex >= totalPages - 1}
            onClick={goToNextPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>

          <button
            type="button"
            disabled={pageIndex >= totalPages - 1}
            onClick={goToLastPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}