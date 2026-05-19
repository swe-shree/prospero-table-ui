import * as react_jsx_runtime from 'react/jsx-runtime';

type TableContainerProps = {
    data: any[];
    table: any;
    emptyMessage?: string;
    firstColumnColor?: string;
};
declare function TableContainer({ data, table, emptyMessage, firstColumnColor, }: TableContainerProps): react_jsx_runtime.JSX.Element;

export { TableContainer as Table, TableContainer, type TableContainerProps };
