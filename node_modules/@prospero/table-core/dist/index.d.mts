import * as _tanstack_react_table from '@tanstack/react-table';
import { ColumnDef, SortingState, OnChangeFn, PaginationState } from '@tanstack/react-table';

type UseTableCoreProps<TData extends object> = {
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
declare function useTableCore<TData extends object>({ data, columns, sorting, onSortingChange, pagination, onPaginationChange, globalFilter, onGlobalFilterChange, enableSorting, enablePagination, enableSearching, }: UseTableCoreProps<TData>): _tanstack_react_table.Table<TData>;

export { type UseTableCoreProps, useTableCore };
