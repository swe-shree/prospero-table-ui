"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Table: () => Table,
  default: () => Table_default
});
module.exports = __toCommonJS(index_exports);

// src/Table.tsx
var import_react = require("react");
var import_react_table = require("@tanstack/react-table");
var import_clsx = __toESM(require("clsx"));
var import_fa = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_table_core = require("@prospero/table-core");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const [pageIndex, setPageIndex] = (0, import_react.useState)(0);
  const [sorting, setSorting] = (0, import_react.useState)([]);
  const [rowSelection, setRowSelection] = (0, import_react.useState)({});
  const generatedColumns = (0, import_react.useMemo)(() => {
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
  const table = (0, import_table_core.useTableCore)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "border-b border-[#CBD5E1] bg-white px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "th",
            {
              onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
              className: (0, import_clsx.default)(
                "border-b border-[#CBD5E1] bg-white px-4 py-3 text-left",
                "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
                canSort && "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-fit items-center gap-2 text-nowrap", children: [
                header.isPlaceholder ? null : (0, import_react_table.flexRender)(
                  header.column.columnDef.header,
                  header.getContext()
                ),
                canSort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, { className: "h-3 w-3 text-slate-900" }) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, { className: "h-3 w-3 text-slate-900" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, { className: "h-3 w-3 text-slate-400" }) })
              ] })
            },
            header.id
          );
        })
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { className: "text-xs", children: rows.length > 0 ? rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "tr",
        {
          className: (0, import_clsx.default)(
            "group transition-colors",
            rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
            "hover:bg-blue-50"
          ),
          children: [
            enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "border-b border-[#CBD5E1] px-4 py-2.5 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-4 w-4 rounded-none border border-[#94A3B8]"
              }
            ) }),
            row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "td",
              {
                style: {
                  ...cellIndex === 1 && firstColumnColor ? {
                    color: firstColumnColor,
                    fontWeight: 600
                  } : {}
                },
                className: "border-b border-[#CBD5E1] px-4 py-2.5 text-left font-normal text-slate-700",
                children: cell.column.id === "filename" ? String(cell.getValue()).replace(".pdf", "").replace(/\s+\d+$/, "") : (0, import_react_table.flexRender)(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
              },
              cell.id
            ))
          ]
        },
        row.id
      )) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: visibleColumnsCount,
          className: "px-4 py-10 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-4 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-slate-500", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold text-black", children: [
          showingFrom,
          "-",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-black", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setPage(0),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setPage(safePageIndex - 1),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Page" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-10 min-w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-3 font-semibold text-black", children: safePageIndex + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setPage(safePageIndex + 1),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setPage(totalPages - 1),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowRight, {})
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
    ] })
  ] });
}
var Table_default = Table;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table
});
