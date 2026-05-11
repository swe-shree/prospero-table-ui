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
var import_react = require("react");
var import_react_table = require("@tanstack/react-table");
var import_fa = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_table_core = require("@prospero/table-core");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  columns,
  pageSize: controlledPageSize = 10,
  total,
  pageIndex: controlledPageIndex,
  onPageChange,
  rowLabel = "documents",
  pageSizeOptions = [10, 20, 30],
  onPageSizeChange,
  enableQueryParams = true,
  pageQueryKey = "page"
}) {
  const isControlled = controlledPageIndex !== void 0 && onPageChange !== void 0;
  const [internalPageSize, setInternalPageSize] = (0, import_react.useState)(controlledPageSize);
  const currentPageSize = internalPageSize;
  const getPageIndexFromUrl = () => {
    if (!enableQueryParams || typeof window === "undefined") {
      return 0;
    }
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  };
  const [internalPageIndex, setInternalPageIndex] = (0, import_react.useState)(getPageIndexFromUrl);
  const pageIndex = isControlled ? controlledPageIndex : internalPageIndex;
  const [sorting, setSorting] = (0, import_react.useState)([]);
  const totalRows = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / currentPageSize));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const updateUrlPage = (0, import_react.useCallback)(
    (next) => {
      if (!enableQueryParams || typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      params.set(pageQueryKey, String(next + 1));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    },
    [enableQueryParams, pageQueryKey]
  );
  const setPage = (0, import_react.useCallback)(
    (next) => {
      const nextPageIndex = Math.max(0, Math.min(next, totalPages - 1));
      updateUrlPage(nextPageIndex);
      if (isControlled) {
        onPageChange?.(nextPageIndex);
      } else {
        setInternalPageIndex(nextPageIndex);
      }
    },
    [isControlled, onPageChange, totalPages, updateUrlPage]
  );
  (0, import_react.useEffect)(() => {
    if (!enableQueryParams || isControlled) return;
    const handlePopState = () => {
      setInternalPageIndex(getPageIndexFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, isControlled, pageQueryKey]);
  const table = (0, import_table_core.useTableCore)({
    data,
    columns,
    sorting,
    onSortingChange: setSorting,
    pagination: {
      pageIndex: safePageIndex,
      pageSize: currentPageSize
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex: safePageIndex, pageSize: currentPageSize }) : updater;
      setPage(next.pageIndex);
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: false
  });
  const showingFrom = totalRows === 0 ? 0 : safePageIndex * currentPageSize + 1;
  const showingTo = Math.min(
    (safePageIndex + 1) * currentPageSize,
    totalRows
  );
  const rows = table.getRowModel().rows;
  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;
  const goToFirstPage = () => setPage(0);
  const goToPreviousPage = () => {
    if (canPrev) setPage(safePageIndex - 1);
  };
  const goToNextPage = () => {
    if (canNext) setPage(safePageIndex + 1);
  };
  const goToLastPage = () => setPage(totalPages - 1);
  const handlePageSizeChange = (e) => {
    const nextPageSize = Number(e.target.value);
    setInternalPageSize(nextPageSize);
    onPageSizeChange?.(nextPageSize);
    setPage(0);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-b border-[#E5E7EB]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-12 px-[10px] py-[10px] text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "checkbox",
            checked: table.getIsAllPageRowsSelected(),
            ref: (el) => {
              if (el) {
                el.indeterminate = table.getIsSomePageRowsSelected();
              }
            },
            onChange: table.getToggleAllPageRowsSelectedHandler(),
            className: "h-4 w-4 rounded border-[#CBD5E1]"
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
                className: "flex w-full items-center justify-center gap-2 bg-transparent p-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_react_table.flexRender)(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }),
                  header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 text-[11px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, {}) })
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
          colSpan: columns.length + 1,
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "tr",
        {
          className: "border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] last:border-b-0",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-[10px] py-[8px] text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-4 w-4 rounded border-[#CBD5E1] disabled:opacity-40"
              }
            ) }),
            row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "td",
              {
                className: "px-[10px] py-[8px] text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]",
                children: (0, import_react_table.flexRender)(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
              },
              cell.id
            ))
          ]
        },
        row.id
      )) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative flex items-center border-t border-[#E5E7EB] bg-white px-5 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-bold text-[#111827]", children: [
          showingFrom,
          "\u2013",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-[#111827]", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-sm text-[#64748B]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            disabled: !canPrev,
            onClick: goToFirstPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            disabled: !canPrev,
            onClick: goToPreviousPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          "Page",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-[#111827]", children: safePageIndex + 1 }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            disabled: !canNext,
            onClick: goToNextPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            disabled: !canNext,
            onClick: goToLastPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowRight, {})
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ml-auto flex items-center gap-2 text-sm text-[#64748B]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "select",
          {
            value: currentPageSize,
            onChange: handlePageSizeChange,
            className: "h-9 rounded-md border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#111827] outline-none",
            children: pageSizeOptions.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: size, children: size }, size))
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
