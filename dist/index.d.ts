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
    enableQueryParams?: boolean;
    pageQueryKey?: string;
};
declare function Table<TData extends object>({ data, columns, pageSize: controlledPageSize, total, pageIndex: controlledPageIndex, onPageChange, rowLabel, enableQueryParams, pageQueryKey, }: TableProps<TData>): react_jsx_runtime.JSX.Element | null;

export { Table, type TableProps };
