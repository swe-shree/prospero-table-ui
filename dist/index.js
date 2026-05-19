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
  Table: () => Table_default,
  TableContainer: () => Table_default
});
module.exports = __toCommonJS(index_exports);

// src/Table.tsx
var import_react_table = require("@tanstack/react-table");
var import_clsx = __toESM(require("clsx"));
var import_fa = require("react-icons/fa");
var import_jsx_runtime = require("react/jsx-runtime");
function TableContainer({
  data,
  table,
  emptyMessage = "No records to display",
  firstColumnColor
}) {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length ?? 1;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header) => {
      const canSort = header.column.getCanSort();
      const isSorted = header.column.getIsSorted();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "th",
        {
          onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
          className: (0, import_clsx.default)(
            "border-b border-[#CBD5E1] bg-white",
            "px-4 py-3 text-left",
            "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
            canSort && "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900",
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
                canSort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, { className: "h-3 w-3 text-slate-900" }) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, { className: "h-3 w-3 text-slate-900" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, { className: "h-3 w-3 text-slate-400" }) })
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
          "group transition-colors",
          rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
          "hover:bg-blue-50"
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
              "border-b border-[#CBD5E1] px-4 py-2.5 text-left font-normal text-slate-700",
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
        className: "px-4 py-10 text-center text-sm text-slate-400",
        children: emptyMessage
      }
    ) }) })
  ] }) }) });
}
var Table_default = TableContainer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table,
  TableContainer
});
