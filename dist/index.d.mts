import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

type TableProps<TData extends object> = {
    columns?: ColumnDef<TData>[];
    data?: TData[];
    total?: number;
    pageSize?: number;
    rowLabel?: string;
    enableSorting?: boolean;
    enableRowSelection?: boolean;
    enablePagination?: boolean;
    emptyMessage?: string;
    firstColumnColor?: string;
};
declare function Table<TData extends object>({ columns, data, total, pageSize, rowLabel, enableSorting, enableRowSelection, enablePagination, emptyMessage, firstColumnColor, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps, Table as default };
