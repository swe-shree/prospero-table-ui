// src/Table.tsx
import { useMemo, useState } from "react";
import {
  flexRender
} from "@tanstack/react-table";
import clsx from "clsx";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import { useTableCore } from "@prospero/table-core";
import { jsx, jsxs } from "react/jsx-runtime";
var hiddenColumns = ["_id", "id", "job_id", "created_at", "updated_at"];
function Table({
  columns = [],
  data = [],
  total,
  pageSize = 10,
  rowLabel = "documents",
  enableSorting = true,
  enableRowSelection = true,
  enablePagination = true,
  emptyMessage = "No data found",
  firstColumnColor
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const generatedColumns = useMemo(() => {
    if (!data || data.length === 0) return columns;
    const autoColumns = Object.keys(data[0]).filter((key) => !hiddenColumns.includes(key)).map((key) => ({
      accessorKey: key,
      header: key.replace(/_/g, " ").toUpperCase()
    }));
    return [...autoColumns, ...columns];
  }, [columns, data]);
  const totalRows = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePageIndex = totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : 0;
  const setPage = (nextPageIndex) => {
    const safeNextPageIndex = Math.max(
      0,
      Math.min(nextPageIndex, totalPages - 1)
    );
    setPageIndex(safeNextPageIndex);
    setRowSelection({});
  };
  const table = useTableCore({
    data,
    columns: generatedColumns,
    sorting,
    onSortingChange: setSorting,
    pagination: {
      pageIndex: safePageIndex,
      pageSize
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({
        pageIndex: safePageIndex,
        pageSize
      }) : updater;
      setPage(next.pageIndex);
    },
    rowSelection,
    onRowSelectionChange: setRowSelection,
    enableSorting,
    enableRowSelection,
    enablePagination,
    manualPagination: false,
    pageCount: totalPages
  });
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
  const showingTo = totalRows === 0 ? 0 : Math.min(showingFrom + rows.length - 1, totalRows);
  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length + (enableRowSelection ? 1 : 0);
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-sm text-[#64748B] transition-colors hover:bg-slate-50 disabled:opacity-40";
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ jsxs("tr", { children: [
        enableRowSelection && /* @__PURE__ */ jsx("th", { className: "border-b border-[#CBD5E1] bg-white px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: table.getIsAllPageRowsSelected(),
            ref: (el) => {
              if (el) {
                el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
              }
            },
            onChange: table.getToggleAllPageRowsSelectedHandler(),
            className: "h-4 w-4 rounded-none border border-[#94A3B8]"
          }
        ) }),
        headerGroup.headers.map((header) => {
          const canSort = header.column.getCanSort();
          const isSorted = header.column.getIsSorted();
          return /* @__PURE__ */ jsx(
            "th",
            {
              onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
              className: clsx(
                "border-b border-[#CBD5E1] bg-white px-4 py-3 text-left",
                "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
                canSort && "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900"
              ),
              children: /* @__PURE__ */ jsxs("div", { className: "flex w-fit items-center gap-2 text-nowrap", children: [
                header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ),
                canSort && /* @__PURE__ */ jsx("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ jsx(FaSortUp, { className: "h-3 w-3 text-slate-900" }) : isSorted === "desc" ? /* @__PURE__ */ jsx(FaSortDown, { className: "h-3 w-3 text-slate-900" }) : /* @__PURE__ */ jsx(FaSort, { className: "h-3 w-3 text-slate-400" }) })
              ] })
            },
            header.id
          );
        })
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { className: "text-xs", children: rows.length > 0 ? rows.map((row, rowIndex) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: clsx(
            "group transition-colors",
            rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
            "hover:bg-blue-50"
          ),
          children: [
            enableRowSelection && /* @__PURE__ */ jsx("td", { className: "border-b border-[#CBD5E1] px-4 py-2.5 text-center", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-4 w-4 rounded-none border border-[#94A3B8]"
              }
            ) }),
            row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ jsx(
              "td",
              {
                style: {
                  ...cellIndex === 1 && firstColumnColor ? {
                    color: firstColumnColor,
                    fontWeight: 600
                  } : {}
                },
                className: "border-b border-[#CBD5E1] px-4 py-2.5 text-left font-normal text-slate-700",
                children: cell.column.id === "filename" ? String(cell.getValue()).replace(".pdf", "").replace(/\s+\d+$/, "") : flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
              },
              cell.id
            ))
          ]
        },
        row.id
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: visibleColumnsCount,
          className: "px-4 py-10 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-4 py-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-black", children: [
          showingFrom,
          "-",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-black", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(0),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(safePageIndex - 1),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx("span", { children: "Page" }),
          /* @__PURE__ */ jsx("span", { className: "flex h-10 min-w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-3 font-semibold text-black", children: safePageIndex + 1 }),
          /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(safePageIndex + 1),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(totalPages - 1),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowRight, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", {})
    ] })
  ] });
}
var Table_default = Table;
export {
  Table,
  Table_default as default
};
