import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

type TableProps<TData extends object> = {
    data: TData[];
    columns: ColumnDef<TData>[];
    pageSize?: number;
    total?: number;
    pageIndex?: number;
    onPageChange?: (nextPageIndex: number) => void;
    rowLabel?: string;
    pageSizeOptions?: number[];
    onPageSizeChange?: (nextPageSize: number) => void;
    enableQueryParams?: boolean;
    pageQueryKey?: string;
};
declare function Table<TData extends object>({ data, columns, pageSize: controlledPageSize, total, pageIndex: controlledPageIndex, onPageChange, rowLabel, pageSizeOptions, onPageSizeChange, enableQueryParams, pageQueryKey, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps };
