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
var import_fa = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_table_core = require("@prospero/table-core");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  columns,
  pageSize = 10,
  total = data.length
}) {
  const table = (0, import_table_core.useTableCore)({
    data,
    columns,
    pagination: {
      pageIndex: 0,
      pageSize
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: true
  });
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPage = pageIndex + 1;
  const totalPages = table.getPageCount();
  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min((pageIndex + 1) * pageSize, total);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-[1100px] border-collapse font-[Inter,sans-serif]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { className: "border-b border-[#E5E7EB]", children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "th",
        {
          className: "whitespace-nowrap border-r border-[#E5E7EB] px-[12px] py-[14px] text-left align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B] last:border-r-0",
          children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              className: "flex w-full items-center justify-between gap-2 border-0 bg-transparent p-0 text-left font-[Inter,sans-serif] text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_react_table.flexRender)(
                  header.column.columnDef.header,
                  header.getContext()
                ) }),
                header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[11px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, {}) })
              ]
            }
          )
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: columns.length,
          className: "px-10 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { className: "border-b border-[#E5E7EB] last:border-b-0", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          className: "border-r border-[#E5E7EB] px-[12px] py-[14px] align-middle text-[12px] font-normal leading-[18px] text-[#1E293B] last:border-r-0",
          children: (0, import_react_table.flexRender)(
            cell.column.columnDef.cell,
            cell.getContext()
          )
        },
        cell.id
      )) }, row.id)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-4 font-[Inter,sans-serif]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-[14px] font-normal text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-[#111827]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-[#111827]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-[#111827]", children: total.toLocaleString() }),
        " ",
        "documents"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 text-[14px] text-[#64748B]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => table.firstPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "whitespace-nowrap text-[14px] text-[#64748B]", children: [
          "Page",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-[#111827]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => table.lastPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowRight, {})
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
