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
var import_react_table = require("@tanstack/react-table");
var import_clsx = __toESM(require("clsx"));
var import_fa = require("react-icons/fa");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  table,
  emptyMessage = "No records to display",
  firstColumnColor,
  enablePagination = true,
  rowLabel = "documents",
  showingFrom = 0,
  showingTo = 0,
  totalRows = data?.length ?? 0,
  currentPage = 1,
  totalPages = 1,
  canPrev = false,
  canNext = false,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage
}) {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length ?? 1;
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white text-black shadow-sm transition-colors hover:bg-[#F8FAFC] disabled:opacity-40";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header) => {
        const canSort = header.column.getCanSort();
        const isSorted = header.column.getIsSorted();
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "th",
          {
            onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
            className: (0, import_clsx.default)(
              "border-b border-[#CBD5E1] bg-[#F8FAFC] px-3 py-3 text-left",
              "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
              canSort && "cursor-pointer transition-colors hover:bg-slate-100 hover:text-slate-900",
              header.column.columnDef.meta?.className
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                className: (0, import_clsx.default)(
                  "flex w-fit items-center gap-2 text-nowrap",
                  header.column.columnDef.meta?.headerClassName
                ),
                children: [
                  header.isPlaceholder ? null : (0, import_react_table.flexRender)(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  canSort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, { className: "h-3 w-3 text-slate-700" }) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, { className: "h-3 w-3 text-slate-700" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, { className: "h-3 w-3 text-slate-400" }) })
                ]
              }
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { className: "text-xs", children: data && rows.length > 0 ? rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "tr",
        {
          className: (0, import_clsx.default)(
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#F1F5F9]",
            "group hover:bg-blue-50"
          ),
          children: row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "td",
            {
              style: {
                ...cellIndex === 1 && firstColumnColor ? {
                  color: firstColumnColor,
                  fontWeight: 600
                } : {}
              },
              className: (0, import_clsx.default)(
                "border-b border-[#E2E8F0] px-3 py-2 text-left font-normal text-slate-700",
                cell.column.columnDef.meta?.className
              ),
              children: cell.column.id === "filename" ? String(cell.getValue()).replace(".pdf", "").replace(/\s+\d+$/, "") : (0, import_react_table.flexRender)(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: visibleColumnsCount,
          className: "px-3 py-8 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-2 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-[11px] text-slate-500", children: [
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onFirstPage,
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaAngleDoubleLeft, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onPrevPage,
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaAngleLeft, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-[11px] text-slate-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Page" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white font-semibold text-black shadow-sm", children: currentPage }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onNextPage,
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaAngleRight, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onLastPage,
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaAngleDoubleRight, { className: "h-4 w-4 text-black" })
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
