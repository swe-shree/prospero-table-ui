import * as react_jsx_runtime from 'react/jsx-runtime';

type TableProps = {
    data: any[];
    table: any;
    emptyMessage?: string;
    firstColumnColor?: string;
    enablePagination?: boolean;
    rowLabel?: string;
    showingFrom?: number;
    showingTo?: number;
    totalRows?: number;
    currentPage?: number;
    totalPages?: number;
    canPrev?: boolean;
    canNext?: boolean;
    onFirstPage?: () => void;
    onPrevPage?: () => void;
    onNextPage?: () => void;
    onLastPage?: () => void;
};
declare function Table({ data, table, emptyMessage, firstColumnColor, enablePagination, rowLabel, showingFrom, showingTo, totalRows, currentPage, totalPages, canPrev, canNext, onFirstPage, onPrevPage, onNextPage, onLastPage, }: TableProps): react_jsx_runtime.JSX.Element;

export { Table, type TableProps, Table as default };
