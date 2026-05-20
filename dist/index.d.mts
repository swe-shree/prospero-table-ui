import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

type TableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData>[];
};
declare function Table<TData>({ data, columns, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps };
