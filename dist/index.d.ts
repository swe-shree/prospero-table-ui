import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef, SortingState, OnChangeFn, PaginationState, RowSelectionState } from '@tanstack/react-table';

type TableProps<TData extends object> = {
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
declare function Table<TData extends object>({ data, columns, sorting, onSortingChange, pagination, onPaginationChange, rowSelection, onRowSelectionChange, enableSorting, enablePagination, enableRowSelection, manualPagination, pageCount, total, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps };
