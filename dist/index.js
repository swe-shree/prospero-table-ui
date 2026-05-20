"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Table: () => Table
});
module.exports = __toCommonJS(index_exports);

// src/Table.tsx
var import_react_table = require("@tanstack/react-table");
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  columns
}) {
  const [sorting, setSorting] = (0, import_react.useState)([]);
  const table = (0, import_react_table.useReactTable)({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table.getSortedRowModel)(),
    getPaginationRowModel: (0, import_react_table.getPaginationRowModel)()
  });
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden rounded-2xl border-2 border-slate-300 bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-separate border-spacing-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-20 bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header) => {
        const canSort = header.column.getCanSort();
        const isSorted = header.column.getIsSorted();
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "th",
          {
            onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
            className: `border-b border-slate-200 bg-[#F8FAFC] px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700 ${canSort ? "cursor-pointer select-none" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
              (0, import_react_table.flexRender)(
                header.column.columnDef.header,
                header.getContext()
              ),
              canSort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUp, { className: "h-3.5 w-3.5 text-slate-700" }) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowDown, { className: "h-3.5 w-3.5 text-slate-700" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpDown, { className: "h-3.5 w-3.5 text-slate-400" }) })
            ] })
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "tr",
        {
          className: index % 2 === 0 ? "bg-white" : "bg-slate-100",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "td",
            {
              className: "border-b border-slate-200 px-5 py-4 text-sm text-slate-700",
              children: (0, import_react_table.flexRender)(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between border-t border-slate-200 px-5 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm text-slate-600", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold", children: table.getRowModel().rows.length }),
        " ",
        "rows"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronsLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm font-medium text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Page" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm", children: table.getState().pagination.pageIndex + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            "of ",
            table.getPageCount()
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.setPageIndex(
              table.getPageCount() - 1
            ),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronsRight, { className: "h-5 w-5" })
          }
        )
      ] })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table
});
