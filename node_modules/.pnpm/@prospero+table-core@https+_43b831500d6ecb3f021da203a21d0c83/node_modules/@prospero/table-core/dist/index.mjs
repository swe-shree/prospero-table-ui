// src/useTableCore.ts
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
function useTableCore({
  data,
  columns,
  sorting = [],
  onSortingChange,
  pagination = {
    pageIndex: 0,
    pageSize: 10
  },
  onPaginationChange,
  globalFilter = "",
  onGlobalFilterChange,
  enableSorting = true,
  enablePagination = true,
  enableSearching = true
}) {
  return useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter
    },
    onSortingChange,
    onPaginationChange,
    onGlobalFilterChange,
    enableSorting,
    enableGlobalFilter: enableSearching,
    getCoreRowModel: getCoreRowModel(),
    ...enableSorting && {
      getSortedRowModel: getSortedRowModel()
    },
    ...enablePagination && {
      getPaginationRowModel: getPaginationRowModel()
    }
  });
}
export {
  useTableCore
};
