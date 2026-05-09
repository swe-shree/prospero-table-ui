import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
} from "@tanstack/react-table";

export type UseTableCoreProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;

  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;

  enableSorting?: boolean;
  enablePagination?: boolean;
  enableSearching?: boolean;
};

export function useTableCore<TData extends object>({
  data,
  columns,

  sorting = [],
  onSortingChange,

  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  onPaginationChange,

  globalFilter = "",
  onGlobalFilterChange,

  enableSorting = true,
  enablePagination = true,
  enableSearching = true,
}: UseTableCoreProps<TData>) {
  return useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination,
      globalFilter,
    },

    onSortingChange,
    onPaginationChange,
    onGlobalFilterChange,

    enableSorting,
    enableGlobalFilter: enableSearching,

    getCoreRowModel: getCoreRowModel(),

    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
    }),

    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
  });
}