/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export type TableProps = {
  data: any[];
  table: any;
  emptyMessage?: string;
  firstColumnColor?: string;
  enablePagination?: boolean;
  rowLabel?: string;
  showingFrom?: number;
  showingTo?: number;
  totalRows?: number;
  currentPage?: number;
  totalPages?: number;
  canPrev?: boolean;
  canNext?: boolean;
  onFirstPage?: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onLastPage?: () => void;
};

export function Table({
  data,
  table,
  emptyMessage = "No records to display",
  firstColumnColor,
  enablePagination = true,
  rowLabel = "documents",
  showingFrom = 0,
  showingTo = 0,
  totalRows = data?.length ?? 0,
  currentPage = 1,
  totalPages = 1,
  canPrev = false,
  canNext = false,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
}: TableProps) {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length ?? 1;

  const paginationButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-xs text-[#64748B] transition-colors hover:bg-slate-50 disabled:opacity-40";

  return (
    <div className="w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full min-w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-20">
            {headerGroups.map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
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
                        "border-b border-[#CBD5E1] bg-white px-3 py-3 text-left",
                        "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
                        canSort &&
                          "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900",
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      <div
                        className={clsx(
                          "flex w-fit items-center gap-2 text-nowrap",
                          header.column.columnDef.meta?.headerClassName,
                        )}
                      >
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
            {data && rows.length > 0 ? (
              rows.map((row: any, rowIndex: number) => (
                <tr
                  key={row.id}
                  className={clsx(
                    "group transition-colors",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#EEF2F7]",
                    "hover:bg-blue-50",
                  )}
                >
                  {row.getVisibleCells().map((cell: any, cellIndex: number) => (
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
                      className={clsx(
                        "border-b border-[#CBD5E1] px-3 py-2 text-left font-normal text-slate-700",
                        cell.column.columnDef.meta?.className,
                      )}
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
                  className="px-3 py-8 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-2 py-2">
          <p className="text-[11px] text-slate-500">
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

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onFirstPage}
              disabled={!canPrev}
              className={paginationButtonClass}
            >
              {"<<"}
            </button>

            <button
              type="button"
              onClick={onPrevPage}
              disabled={!canPrev}
              className={paginationButtonClass}
            >
              {"<"}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Page</span>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-2 font-semibold text-black">
                {currentPage}
              </span>

              <span className="text-black">of {totalPages}</span>
            </div>

            <button
              type="button"
              onClick={onNextPage}
              disabled={!canNext}
              className={paginationButtonClass}
            >
              {">"}
            </button>

            <button
              type="button"
              onClick={onLastPage}
              disabled={!canNext}
              className={paginationButtonClass}
            >
              {">>"}
            </button>
          </div>

          <div />
        </div>
      )}
    </div>
  );
}

export default Table;