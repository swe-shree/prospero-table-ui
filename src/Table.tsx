"use client";

import {
  flexRender,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type OnChangeFn,
} from "@tanstack/react-table";

import { useTableCore } from "@prospero/table-core";

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;

  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;

  manualPagination?: boolean;
  pageCount?: number;
  total?: number;
};

export function Table<TData extends object>({
  data,
  columns,

  sorting = [],
  onSortingChange,

  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  onPaginationChange,

  rowSelection = {},
  onRowSelectionChange,

  enableSorting = true,
  enablePagination = true,
  enableRowSelection = false,

  manualPagination = false,
  pageCount,
  total,
}: TableProps<TData>) {
  const isServerPagination =
    manualPagination || total !== undefined || pageCount !== undefined;

  const totalCount = total ?? data.length;

  const totalPages =
    pageCount ?? Math.max(1, Math.ceil(totalCount / pagination.pageSize));

  const table = useTableCore({
    data,
    columns,
    sorting,
    onSortingChange,
    pagination,
    onPaginationChange,
    rowSelection,
    onRowSelectionChange,
    enableSorting,
    enablePagination,
    enableRowSelection,
    manualPagination: isServerPagination,
    pageCount: totalPages,
  });

  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;
  const currentPage = pageIndex + 1;

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex + 1 < totalPages;

  const goToPage = (nextPageIndex: number) => {
    const safePageIndex = Math.max(0, Math.min(nextPageIndex, totalPages - 1));

    onPaginationChange?.({
      pageIndex: safePageIndex,
      pageSize,
    });
  };

  const rows = table.getRowModel().rows;

  const showingFrom = totalCount === 0 ? 0 : pageIndex * pageSize + 1;

  const showingTo =
    totalCount === 0
      ? 0
      : Math.min(showingFrom + data.length - 1, totalCount);

  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]">
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-white">
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
                        disabled={!header.column.getCanSort()}
                        className="flex w-full items-center justify-center gap-1 bg-transparent p-0 text-center disabled:cursor-default"
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>

                        {header.column.getCanSort() && (
                          <span className="text-[10px] text-[#94A3B8]">
                            {header.column.getIsSorted() === "asc"
                              ? "▲"
                              : header.column.getIsSorted() === "desc"
                                ? "▼"
                                : "↕"}
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
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-[#64748B]"
                >
                  No data found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#F1F5F9]">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-[10px] py-[8px] text-center align-middle text-[12px] font-medium leading-[13.48px] tracking-[0.51px] text-[#1E293B]"
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
        <div className="flex items-center border-t border-[#E5E7EB] px-4 py-3">
          <p className="text-sm text-[#64748B]">
            Showing{" "}
            <span className="font-semibold text-[#1E293B]">{showingFrom}</span>
            –
            <span className="font-semibold text-[#1E293B]">{showingTo}</span>{" "}
            of{" "}
            <span className="font-semibold text-[#1E293B]">{totalCount}</span>
          </p>

          <div className="flex flex-1 items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(0)}
              disabled={!canPreviousPage}
              className="rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"<<"}
            </button>

            <button
              type="button"
              onClick={() => goToPage(pageIndex - 1)}
              disabled={!canPreviousPage}
              className="rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"<"}
            </button>

            <span className="px-2 text-sm text-[#64748B]">
              Page{" "}
              <span className="font-semibold text-[#1E293B]">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#1E293B]">
                {totalPages}
              </span>
            </span>

            <button
              type="button"
              onClick={() => goToPage(pageIndex + 1)}
              disabled={!canNextPage}
              className="rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {">"}
            </button>

            <button
              type="button"
              onClick={() => goToPage(totalPages - 1)}
              disabled={!canNextPage}
              className="rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}