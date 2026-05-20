"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

export type TableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
};

export function Table<TData>({
  data,
  columns,
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  const paginationButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="w-full overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
      <div className="max-h-[500px] w-full overflow-auto">
        <table className="w-full min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-[#F8FAFC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort =
                    header.column.getCanSort();

                  const isSorted =
                    header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`border-b border-slate-200 bg-[#F8FAFC] px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700 ${
                        canSort
                          ? "cursor-pointer select-none"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {canSort && (
                          <>
                            {isSorted === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5 text-slate-700" />
                            ) : isSorted === "desc" ? (
                              <ArrowDown className="h-3.5 w-3.5 text-slate-700" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-slate-100"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-slate-200 px-5 py-4 text-sm text-slate-700"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
        <div className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold">
            {table.getRowModel().rows.length}
          </span>{" "}
          rows
        </div>

        <div className="flex items-center gap-3">
          <button
            className={paginationButtonClass}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-5 w-5" />
          </button>

          <button
            className={paginationButtonClass}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span>Page</span>

            <div className="flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm">
              {table.getState().pagination.pageIndex + 1}
            </div>

            <span>
              of {table.getPageCount()}
            </span>
          </div>

          <button
            className={paginationButtonClass}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            className={paginationButtonClass}
            onClick={() =>
              table.setPageIndex(
                table.getPageCount() - 1
              )
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}