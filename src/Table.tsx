"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import clsx from "clsx";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useTableCore } from "@prospero/table-core";

export type TableProps<TData extends object> = {
  columns?: ColumnDef<TData>[];
  data?: TData[];
  total?: number;
  pageSize?: number;
  rowLabel?: string;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  emptyMessage?: string;
  firstColumnColor?: string;
};

const hiddenColumns = ["_id", "id", "job_id", "created_at", "updated_at"];

export function Table<TData extends object>({
  columns = [],
  data = [],
  total,
  pageSize = 10,
  rowLabel = "documents",
  enableSorting = true,
  enableRowSelection = true,
  enablePagination = true,
  emptyMessage = "No data found",
  firstColumnColor,
}: TableProps<TData>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const generatedColumns = useMemo<ColumnDef<TData>[]>(() => {
    if (!data || data.length === 0) return columns;

    const autoColumns = Object.keys(data[0])
      .filter((key) => !hiddenColumns.includes(key))
      .map((key) => ({
        accessorKey: key,
        header: key.replace(/_/g, " ").toUpperCase(),
      })) as ColumnDef<TData>[];

    return [...autoColumns, ...columns];
  }, [columns, data]);

  const totalRows = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const safePageIndex =
    totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : 0;

  const setPage = (nextPageIndex: number) => {
    const safeNextPageIndex = Math.max(
      0,
      Math.min(nextPageIndex, totalPages - 1),
    );

    setPageIndex(safeNextPageIndex);
    setRowSelection({});
  };

  const table = useTableCore({
    data,
    columns: generatedColumns,
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
    enablePagination,
    manualPagination: false,
    pageCount: totalPages,
  });

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();

  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
  const showingTo =
    totalRows === 0
      ? 0
      : Math.min(showingFrom + rows.length - 1, totalRows);

  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;

  const visibleColumnsCount =
    table.getVisibleLeafColumns?.().length + (enableRowSelection ? 1 : 0);

  const paginationButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-sm text-[#64748B] transition-colors hover:bg-slate-50 disabled:opacity-40";

  return (
    <div className="w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full min-w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-20">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {enableRowSelection && (
                  <th className="border-b border-[#CBD5E1] bg-white px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
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
                      className="h-4 w-4 rounded-none border border-[#94A3B8]"
                    />
                  </th>
                )}

                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={clsx(
                        "border-b border-[#CBD5E1] bg-white px-4 py-3 text-left",
                        "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
                        canSort &&
                          "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <div className="flex w-fit items-center gap-2 text-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                        {canSort && (
                          <span className="inline-flex h-4 w-4 items-center justify-center">
                            {isSorted === "asc" ? (
                              <FaSortUp className="h-3 w-3 text-slate-900" />
                            ) : isSorted === "desc" ? (
                              <FaSortDown className="h-3 w-3 text-slate-900" />
                            ) : (
                              <FaSort className="h-3 w-3 text-slate-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="text-xs">
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={clsx(
                    "group transition-colors",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
                    "hover:bg-blue-50",
                  )}
                >
                  {enableRowSelection && (
                    <td className="border-b border-[#CBD5E1] px-4 py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-4 w-4 rounded-none border border-[#94A3B8]"
                      />
                    </td>
                  )}

                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      style={{
                        ...(cellIndex === 1 && firstColumnColor
                          ? {
                              color: firstColumnColor,
                              fontWeight: 600,
                            }
                          : {}),
                      }}
                      className="border-b border-[#CBD5E1] px-4 py-2.5 text-left font-normal text-slate-700"
                    >
                      {cell.column.id === "filename"
                        ? String(cell.getValue())
                            .replace(".pdf", "")
                            .replace(/\s+\d+$/, "")
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={visibleColumnsCount}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-4 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-black">
              {showingFrom}-{showingTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-black">
              {totalRows.toLocaleString()}
            </span>{" "}
            {rowLabel}
          </p>

          <div className="flex items-center justify-center gap-2">
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

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Page</span>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-3 font-semibold text-black">
                {safePageIndex + 1}
              </span>

              <span className="text-black">of {totalPages}</span>
            </div>

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

          <div />
        </div>
      )}
    </div>
  );
}

export default Table;