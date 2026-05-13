"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { flexRender, type ColumnDef, type SortingState, type RowSelectionState } from "@tanstack/react-table";
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
  onSelectionChange?: (selectedRows: TData[]) => void;
  rowLabel?: string;
  enableQueryParams?: boolean;
  pageQueryKey?: string;
};

function TableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-[#E5E7EB]">
              <th className="w-12 px-[10px] py-[10px]" />
              {Array.from({ length: columnCount }).map((_, i) => (
                <th key={i} className="px-[10px] py-[10px]">
                  <div className="mx-auto h-3 w-20 animate-pulse rounded bg-[#E5E7EB]" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, r) => (
              <tr key={r} className="border-b border-[#E5E7EB]">
                <td className="px-[10px] py-[8px]">
                  <div className="mx-auto h-4 w-4 animate-pulse rounded bg-[#E5E7EB]" />
                </td>

                {Array.from({ length: columnCount }).map((_, c) => (
                  <td key={c} className="px-[10px] py-[8px]">
                    <div className="mx-auto h-3 w-24 animate-pulse rounded bg-[#E5E7EB]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#E5E7EB] bg-white px-5 py-4">
        <div className="h-4 w-40 animate-pulse rounded bg-[#E5E7EB]" />
      </div>
    </div>
  );
}

export function Table<TData extends object>({
  data,
  columns,
  pageSize = 10,
  total,
  pageIndex: controlledPageIndex,
  onPageChange,
  onSelectionChange,
  rowLabel = "documents",
  enableQueryParams = true,
  pageQueryKey = "page",
}: TableProps<TData>) {
  const isControlled =
    controlledPageIndex !== undefined && onPageChange !== undefined;

  const [hasMounted, setHasMounted] = useState(false);
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const getPageIndexFromUrl = useCallback(() => {
    if (!enableQueryParams || typeof window === "undefined") return 0;

    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) ?? "1");

    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);

  useEffect(() => {
    if (!isControlled) {
      setInternalPageIndex(getPageIndexFromUrl());
    }

    setHasMounted(true);
  }, [getPageIndexFromUrl, isControlled]);

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

  const activePageIndex = isControlled
    ? controlledPageIndex
    : internalPageIndex;

  const totalRows = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePageIndex = Math.max(
    0,
    Math.min(activePageIndex, totalPages - 1)
  );

  const updateUrlPage = useCallback(
    (nextPageIndex: number) => {
      if (!enableQueryParams || typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      params.set(pageQueryKey, String(nextPageIndex + 1));

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    },
    [enableQueryParams, pageQueryKey]
  );

  const setPage = useCallback(
    (nextPageIndex: number) => {
      const clampedPageIndex = Math.max(
        0,
        Math.min(nextPageIndex, totalPages - 1)
      );

      updateUrlPage(clampedPageIndex);

      if (isControlled) {
        onPageChange?.(clampedPageIndex);
      } else {
        setInternalPageIndex(clampedPageIndex);
      }
    },
    [isControlled, onPageChange, totalPages, updateUrlPage]
  );

  const table = useTableCore({
    data,
    columns,

    sorting,
    onSortingChange: setSorting,

    rowSelection,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,

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

    manualPagination: total !== undefined,
    pageCount: totalPages,

    enableSorting: true,
    enablePagination: true,
    enableSearching: false,
  });

  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;

  useEffect(() => {
    if (!onSelectionChangeRef.current) return;

    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    onSelectionChangeRef.current(selectedRows);
  }, [rowSelection, table]);

  if (!hasMounted) {
    return <TableSkeleton columnCount={columns.length} />;
  }

  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
  const showingTo = Math.min((safePageIndex + 1) * pageSize, totalRows);

  const rows = table.getRowModel().rows;

  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                <th className="w-12 px-[10px] py-[10px] text-center">
                  <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = table.getIsSomePageRowsSelected();
                      }
                    }}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    className="h-4 w-4 rounded border-[#CBD5E1]"
                    aria-label="Select all rows on this page"
                  />
                </th>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                        className="flex w-full items-center justify-center gap-2 bg-transparent p-0 disabled:cursor-default"
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>

                        {header.column.getCanSort() && (
                          <span
                            className="shrink-0 text-[11px] text-[#94A3B8]"
                            aria-hidden="true"
                          >
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
                  data-selected={row.getIsSelected() || undefined}
                  className="border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] data-[selected]:bg-[#EFF6FF] last:border-b-0"
                >
                  <td className="px-[10px] py-[8px] text-center">
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      className="h-4 w-4 rounded border-[#CBD5E1] disabled:opacity-40"
                      aria-label={`Select row ${row.index + 1}`}
                    />
                  </td>

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

        <nav
          aria-label="Pagination"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-sm text-[#64748B]"
        >
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setPage(0)}
            aria-label="First page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setPage(safePageIndex - 1)}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowBackIosNew />
          </button>

          <p aria-live="polite" aria-atomic="true">
            Page{" "}
            <span className="font-bold text-[#111827]">
              {safePageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#111827]">{totalPages}</span>
          </p>

          <button
            type="button"
            disabled={!canNext}
            onClick={() => setPage(safePageIndex + 1)}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>

          <button
            type="button"
            disabled={!canNext}
            onClick={() => setPage(totalPages - 1)}
            aria-label="Last page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
}