"use client";

import { useState, useCallback } from "react";
import {
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
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
  pageIndex?: number;

  onPageChange?: (nextPageIndex: number) => void;

  rowLabel?: string;
};

export function Table<TData extends object>({
  data,
  columns,
  pageSize = 10,
  total,
  pageIndex: controlledPageIndex,
  onPageChange,
  rowLabel = "documents",
}: TableProps<TData>) {
  const isControlled =
    controlledPageIndex !== undefined &&
    onPageChange !== undefined;

  const [internalPageIndex, setInternalPageIndex] = useState(0);

  const pageIndex = isControlled
    ? controlledPageIndex
    : internalPageIndex;

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const table = useTableCore({
    data,
    columns,

    sorting,
    onSortingChange: setSorting,

    pagination: {
      pageIndex,
      pageSize,
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      if (isControlled) {
        onPageChange(next.pageIndex);
      } else {
        setInternalPageIndex(next.pageIndex);
      }
    },

    enableSorting: true,
    enablePagination: true,
    enableSearching: false,
  });

  const totalRows = total ?? data.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalRows / pageSize)
  );

  const showingFrom =
    totalRows === 0
      ? 0
      : pageIndex * pageSize + 1;

  const showingTo = Math.min(
    (pageIndex + 1) * pageSize,
    totalRows
  );

  const rows = table.getRowModel().rows;

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;

  const setPage = useCallback(
    (next: number) => {
      if (isControlled) {
        onPageChange!(next);
      } else {
        setInternalPageIndex(next);
        table.setPageIndex(next);
      }
    },
    [isControlled, onPageChange, table]
  );

  const goToFirstPage = () => setPage(0);

  const goToPreviousPage = () => {
    if (canPrev) {
      setPage(pageIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (canNext) {
      setPage(pageIndex + 1);
    }
  };

  const goToLastPage = () =>
    setPage(totalPages - 1);

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#F8FAFC]">
            {table.getHeaderGroups().map(
              (headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-[#E5E7EB]"
                >
                  <th className="w-12 px-[10px] py-[10px] text-center">
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            table.getIsSomePageRowsSelected();
                        }
                      }}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="h-4 w-4 rounded border-[#CBD5E1]"
                    />
                  </th>

                  {headerGroup.headers.map(
                    (header) => (
                      <th
                        key={header.id}
                        className="px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
                      >
                        {header.isPlaceholder
                          ? null
                          : (
                            <button
                              type="button"
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={!header.column.getCanSort()}
                              className="flex w-full items-center justify-center gap-2 bg-transparent p-0"
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>

                              {header.column.getCanSort() && (
                                <span className="shrink-0 text-[11px] text-[#94A3B8]">
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
                    )
                  )}
                </tr>
              )
            )}
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
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      className="h-4 w-4 rounded border-[#CBD5E1] disabled:opacity-40"
                    />
                  </td>

                  {row.getVisibleCells().map(
                    (cell) => (
                      <td
                        key={cell.id}
                        className="px-[10px] py-[8px] text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  )}
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
            {totalRows.toLocaleString()}
          </span>{" "}
          {rowLabel}
        </p>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-sm text-[#64748B]">
          <button
            type="button"
            disabled={!canPrev}
            onClick={goToFirstPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            type="button"
            disabled={!canPrev}
            onClick={goToPreviousPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowBackIosNew />
          </button>

          <p>
            Page{" "}
            <span className="font-bold text-[#111827]">
              {pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#111827]">
              {totalPages}
            </span>
          </p>

          <button
            type="button"
            disabled={!canNext}
            onClick={goToNextPage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>

          <button
            type="button"
            disabled={!canNext}
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