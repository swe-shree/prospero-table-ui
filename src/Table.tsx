"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
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

  enableQueryParams?: boolean;
  pageQueryKey?: string;

  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;

  emptyMessage?: string;
};

export function Table<TData extends object>({
  data,
  columns,

  pageSize = 10,
  total,

  pageIndex: controlledPageIndex,
  onPageChange,

  rowLabel = "documents",

  enableQueryParams = true,
  pageQueryKey = "page",

  enableSorting = true,
  enableRowSelection = true,
  enablePagination = true,

  emptyMessage = "No data found",
}: TableProps<TData>) {
  const isControlled =
    controlledPageIndex !== undefined && onPageChange !== undefined;

  const [hasMounted, setHasMounted] = useState(false);
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const getPageIndexFromUrl = useCallback(() => {
    if (!enableQueryParams || typeof window === "undefined") {
      return 0;
    }

    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");

    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);

  useEffect(() => {
    setInternalPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, [getPageIndexFromUrl]);

  useEffect(() => {
    if (!enableQueryParams || isControlled) return;

    const handlePopState = () => {
      setInternalPageIndex(getPageIndexFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, getPageIndexFromUrl, isControlled]);

  const rawPageIndex = isControlled
    ? controlledPageIndex ?? 0
    : internalPageIndex;

  const totalRows = total ?? data.length;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);

  const safePageIndex = Math.max(0, Math.min(rawPageIndex, totalPages - 1));

  const updateUrlPage = useCallback(
    (nextPageIndex: number) => {
      if (!enableQueryParams || typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      params.set(pageQueryKey, String(nextPageIndex + 1));

      const queryString = params.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.pushState({}, "", newUrl);
    },
    [enableQueryParams, pageQueryKey]
  );

  const setPage = useCallback(
    (nextPageIndex: number) => {
      const safeNextPageIndex = Math.max(
        0,
        Math.min(nextPageIndex, totalPages - 1)
      );

      updateUrlPage(safeNextPageIndex);

      if (isControlled) {
        onPageChange?.(safeNextPageIndex);
      } else {
        setInternalPageIndex(safeNextPageIndex);
      }

      setRowSelection({});
    },
    [isControlled, onPageChange, totalPages, updateUrlPage]
  );

  const table = useTableCore({
    data,
    columns,

    sorting,
    onSortingChange: setSorting,

    pagination: {
      pageIndex: safePageIndex,
      pageSize,
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({
              pageIndex: safePageIndex,
              pageSize,
            })
          : updater;

      setPage(next.pageIndex);
    },

    rowSelection,
    onRowSelectionChange: setRowSelection,

    enableSorting,
    enableRowSelection,
  });

  const rows = table.getRowModel().rows;

  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;

  const showingTo =
    totalRows === 0
      ? 0
      : Math.min(showingFrom + data.length - 1, totalRows);

  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;

  const goToFirstPage = useCallback(() => {
    if (!canPrev) return;
    setPage(0);
  }, [canPrev, setPage]);

  const goToPreviousPage = useCallback(() => {
    if (!canPrev) return;
    setPage(safePageIndex - 1);
  }, [canPrev, safePageIndex, setPage]);

  const goToNextPage = useCallback(() => {
    if (!canNext) return;
    setPage(safePageIndex + 1);
  }, [canNext, safePageIndex, setPage]);

  const goToLastPage = useCallback(() => {
    if (!canNext) return;
    setPage(totalPages - 1);
  }, [canNext, setPage, totalPages]);

  if (!hasMounted) {
    return null;
  }

  const paginationButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#334155] hover:bg-[#F8FAFC]";

  const inactivePaginationButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#94A3B8]";

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                {enableRowSelection && (
                  <th className="w-12 px-[10px] py-[10px] text-center">
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            table.getIsSomePageRowsSelected() &&
                            !table.getIsAllPageRowsSelected();
                        }
                      }}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1]"
                    />
                  </th>
                )}

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={
                          !enableSorting || !header.column.getCanSort()
                        }
                        className="flex w-full items-center justify-center gap-2 bg-transparent p-0 disabled:cursor-default"
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>

                        {enableSorting && header.column.getCanSort() && (
                          <span className="shrink-0 text-[11px] text-[#94A3B8]">
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
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-[#64748B]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] last:border-b-0"
                >
                  {enableRowSelection && (
                    <td className="px-[10px] py-[8px] text-center">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] disabled:opacity-40"
                      />
                    </td>
                  )}

                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-[10px] py-[8px] text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]"
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

      {enablePagination && (
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
              onClick={goToFirstPage}
              className={
                canPrev
                  ? paginationButtonClass
                  : inactivePaginationButtonClass
              }
            >
              <MdKeyboardDoubleArrowLeft />
            </button>

            <button
              type="button"
              onClick={goToPreviousPage}
              className={
                canPrev
                  ? paginationButtonClass
                  : inactivePaginationButtonClass
              }
            >
              <MdArrowBackIosNew />
            </button>

            <p>
              Page{" "}
              <span className="font-bold text-[#111827]">
                {safePageIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#111827]">{totalPages}</span>
            </p>

            <button
              type="button"
              onClick={goToNextPage}
              className={
                canNext
                  ? paginationButtonClass
                  : inactivePaginationButtonClass
              }
            >
              <MdArrowForwardIos />
            </button>

            <button
              type="button"
              onClick={goToLastPage}
              className={
                canNext
                  ? paginationButtonClass
                  : inactivePaginationButtonClass
              }
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}