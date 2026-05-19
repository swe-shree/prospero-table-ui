import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

type TableProps<TData extends object> = {
    columns?: ColumnDef<TData>[];
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
declare function Table<TData extends object>({ columns, data, total, fetchUrl, pageSize, rowLabel, enableQueryParams, pageQueryKey, enableSorting, enableRowSelection, enablePagination, emptyMessage, }: TableProps<TData>): react_jsx_runtime.JSX.Element | null;

export { Table, type TableProps };
