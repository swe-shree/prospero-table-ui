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

type FetchResponse<TData> = {
  items: TData[];
  total: number;
};

export type TableProps<TData extends object> = {
  columns: ColumnDef<TData>[];
  data?: TData[];
  total?: number;
  fetchUrl?: string;
  pageSize?: number;
  rowLabel?: string;
  enableQueryParams?: boolean;
  pageQueryKey?: string;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  emptyMessage?: string;
};

export function Table<TData extends object>({
  columns,
  data = [],
  total,
  fetchUrl,
  pageSize = 10,
  rowLabel = "documents",
  enableQueryParams = true,
  pageQueryKey = "page",
  enableSorting = true,
  enableRowSelection = true,
  enablePagination = true,
  emptyMessage = "No data found",
}: TableProps<TData>) {
  const isServerPagination = Boolean(fetchUrl);

  const [hasMounted, setHasMounted] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const [internalData, setInternalData] = useState<TData[]>([]);
  const [internalTotal, setInternalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tableData = isServerPagination ? internalData : data;
  const totalRows = isServerPagination ? internalTotal : total ?? data.length;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);

  const safePageIndex =
    totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : pageIndex;

  const getPageIndexFromUrl = useCallback(() => {
    if (!enableQueryParams || typeof window === "undefined") return 0;

    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");

    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);

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
    [enableQueryParams, pageQueryKey],
  );

  const setPage = useCallback(
    (nextPageIndex: number) => {
      const safeNextPageIndex = Math.max(
        0,
        Math.min(nextPageIndex, totalPages - 1),
      );

      setPageIndex(safeNextPageIndex);
      updateUrlPage(safeNextPageIndex);
      setRowSelection({});
    },
    [totalPages, updateUrlPage],
  );

  useEffect(() => {
    setPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, [getPageIndexFromUrl]);

  useEffect(() => {
    if (!enableQueryParams) return;

    const handlePopState = () => {
      setPageIndex(getPageIndexFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, getPageIndexFromUrl]);

  useEffect(() => {
    if (!fetchUrl || !hasMounted) return;

    const controller = new AbortController();

    async function loadData() {
      try {
        setIsLoading(true);

        const url = new URL(fetchUrl!);
        url.searchParams.set("page", String(safePageIndex + 1));
        url.searchParams.set("limit", String(pageSize));

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch table data");
        }

        const result = (await response.json()) as FetchResponse<TData>;

        setInternalData(result.items);
        setInternalTotal(result.total);
      } catch (error) {
        if (!controller.signal.aborted) {
          setInternalData([]);
          setInternalTotal(0);
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, [fetchUrl, hasMounted, safePageIndex, pageSize]);

  const table = useTableCore({
    data: tableData,
    columns,

    sorting,
    onSortingChange: setSorting,

    pagination: {
      pageIndex: isServerPagination ? 0 : safePageIndex,
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
    enablePagination,

    manualPagination: isServerPagination,
    pageCount: totalPages,
  });

  const rows = table.getRowModel().rows;

  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;

  const showingTo =
    totalRows === 0
      ? 0
      : Math.min(showingFrom + tableData.length - 1, totalRows);

  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;

  if (!hasMounted) {
    return null;
  }

  const paginationButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-[#CBD5E1] bg-white text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40";

  return (
    <div className="w-full overflow-hidden border border-[#D1D5DB] bg-white font-sans">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                {enableRowSelection && (
                  <th className="w-12 px-5 py-3 text-center">
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
                      className="h-[18px] w-[18px] cursor-pointer rounded border border-[#D1D5DB]"
                    />
                  </th>
                )}

                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={`px-5 py-3 text-left align-middle text-[12px] font-semibold uppercase leading-5 tracking-[0.04em] ${
                        isSorted ? "bg-[#F1F5F9] text-[#334155]" : "text-[#64748B]"
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!enableSorting || !header.column.getCanSort()}
                          className="flex w-full items-center gap-2 bg-transparent p-0 text-left disabled:cursor-default"
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>

                          {enableSorting && header.column.getCanSort() && (
                            <span
                              className={`shrink-0 text-[10px] ${
                                isSorted ? "text-[#475569]" : "text-[#CBD5E1]"
                              }`}
                            >
                              {isSorted === "asc" ? (
                                <FaSortUp />
                              ) : isSorted === "desc" ? (
                                <FaSortDown />
                              ) : (
                                <FaSort />
                              )}
                            </span>
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="px-5 py-10 text-center text-sm text-[#64748B]"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="px-5 py-10 text-center text-sm text-[#64748B]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`h-[48px] border-b border-[#E5E7EB] transition-colors hover:bg-[#F8FAFC] last:border-b-0 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                  }`}
                >
                  {enableRowSelection && (
                    <td className="px-5 py-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-[18px] w-[18px] cursor-pointer rounded border border-[#D1D5DB] disabled:opacity-40"
                      />
                    </td>
                  )}

                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-3 text-left align-middle text-[13px] font-normal leading-5 text-slate-600 font normal"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
        <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-3">
          <p className="text-sm text-[#64748B]">
            Showing{" "}
            <span className="font-semibold text-[#1E293B]">
              {showingFrom}-{showingTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#1E293B]">
              {totalRows.toLocaleString()}
            </span>{" "}
            {rowLabel}
          </p>

          <div className="flex items-center gap-1 text-sm text-[#64748B]">
            <button
              type="button"
              onClick={() => setPage(0)}
              disabled={!canPrev}
              className={paginationButtonClass}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>

            <button
              type="button"
              onClick={() => setPage(safePageIndex - 1)}
              disabled={!canPrev}
              className={paginationButtonClass}
            >
              <MdArrowBackIosNew />
            </button>

            <p className="mx-2 text-sm text-[#64748B]">
              Page{" "}
              <span className="font-semibold text-[#1E293B]">
                {safePageIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#1E293B]">{totalPages}</span>
            </p>

            <button
              type="button"
              onClick={() => setPage(safePageIndex + 1)}
              disabled={!canNext}
              className={paginationButtonClass}
            >
              <MdArrowForwardIos />
            </button>

            <button
              type="button"
              onClick={() => setPage(totalPages - 1)}
              disabled={!canNext}
              className={paginationButtonClass}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}