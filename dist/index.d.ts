import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

type TableProps<TData extends object> = {
    data: TData[];
    columns: ColumnDef<TData>[];
    pageSize?: number;
    total?: number;
    pageIndex?: number;
    onPageChange?: (nextPageIndex: number) => void;
    enableRowSelection?: boolean;
    enablePagination?: boolean;
    rowLabel?: string;
    emptyState?: React.ReactNode;
    isLoading?: boolean;
    enableQueryParams?: boolean;
    pageQueryKey?: string;
};
declare function Table<TData extends object>({ data, columns, pageSize: controlledPageSize, total, pageIndex: controlledPageIndex, onPageChange, enableRowSelection, enablePagination, rowLabel, emptyState, isLoading, enableQueryParams, pageQueryKey, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps };
