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
var import_table_core = require("@prospero/table-core");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  columns,
  sorting = [],
  onSortingChange,
  pagination = {
    pageIndex: 0,
    pageSize: 10
  },
  onPaginationChange,
  rowSelection = {},
  onRowSelectionChange,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = false,
  manualPagination = false,
  pageCount,
  total
}) {
  const totalCount = total ?? data.length;
  const totalPages = pageCount ?? Math.max(1, Math.ceil(totalCount / pagination.pageSize));
  const isServerPagination = manualPagination || total !== void 0 || pageCount !== void 0;
  const table = (0, import_table_core.useTableCore)({
    data,
    columns,
    sorting,
    onSortingChange,
    pagination,
    onPaginationChange,
    rowSelection,
    onRowSelectionChange,
    enableSorting,
    enablePagination,
    enableRowSelection,
    manualPagination: isServerPagination,
    pageCount: totalPages
  });
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;
  const currentPage = pageIndex + 1;
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex + 1 < totalPages;
  const goToPage = (nextPageIndex) => {
    const safePageIndex = Math.max(0, Math.min(nextPageIndex, totalPages - 1));
    onPaginationChange?.({
      pageIndex: safePageIndex,
      pageSize
    });
  };
  const rows = table.getRowModel().rows;
  const showingFrom = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = totalCount === 0 ? 0 : Math.min(showingFrom + data.length - 1, totalCount);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-10 bg-white", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-b border-[#E5E7EB]", children: [
        enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-[48px] px-[10px] py-[10px] text-center align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "checkbox",
            checked: table.getIsAllPageRowsSelected(),
            ref: (input) => {
              if (input) {
                input.indeterminate = table.getIsSomePageRowsSelected();
              }
            },
            onChange: table.getToggleAllPageRowsSelectedHandler(),
            className: "h-4 w-4 cursor-pointer"
          }
        ) }),
        headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "th",
          {
            className: "px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
            children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                disabled: !header.column.getCanSort(),
                className: "flex w-full items-center justify-center gap-1 bg-transparent p-0 text-center disabled:cursor-default",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_react_table.flexRender)(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }),
                  header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? "\u25B2" : header.column.getIsSorted() === "desc" ? "\u25BC" : "\u2195" })
                ]
              }
            )
          },
          header.id
        ))
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: columns.length + (enableRowSelection ? 1 : 0),
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-b border-[#F1F5F9]", children: [
        enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "w-[48px] px-[10px] py-[8px] text-center align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "checkbox",
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
            className: "h-4 w-4 cursor-pointer"
          }
        ) }),
        row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "td",
          {
            className: "px-[10px] py-[8px] text-center align-middle text-[12px] font-medium leading-[13.48px] tracking-[0.51px] text-[#1E293B]",
            children: (0, import_react_table.flexRender)(
              cell.column.columnDef.cell,
              cell.getContext()
            )
          },
          cell.id
        ))
      ] }, row.id)) })
    ] }) }),
    enablePagination && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center border-t border-[#E5E7EB] px-4 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-[#1E293B]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-[#1E293B]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-[#1E293B]", children: totalCount })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-1 items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => goToPage(0),
            disabled: !canPreviousPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: "<<"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => goToPage(pageIndex - 1),
            disabled: !canPreviousPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: "<"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "px-2 text-sm text-[#64748B]", children: [
          "Page",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-[#1E293B]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-[#1E293B]", children: totalPages })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => goToPage(pageIndex + 1),
            disabled: !canNextPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: ">"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => goToPage(totalPages - 1),
            disabled: !canNextPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: ">>"
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
