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
  columns,
  data = [],
  total,
  fetchUrl,
  pageSize = 10,
  rowLabel = "documents",
  enableQueryParams = true,
  pageQueryKey = "page",
  enableSorting = true,
  enableRowSelection = true,
  enablePagination = true,
  emptyMessage = "No data found"
}) {
  const isServerPagination = Boolean(fetchUrl);
  const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
  const [pageIndex, setPageIndex] = (0, import_react.useState)(0);
  const [internalData, setInternalData] = (0, import_react.useState)([]);
  const [internalTotal, setInternalTotal] = (0, import_react.useState)(0);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [sorting, setSorting] = (0, import_react.useState)([]);
  const [rowSelection, setRowSelection] = (0, import_react.useState)({});
  const tableData = isServerPagination ? internalData : data;
  const totalRows = isServerPagination ? internalTotal : total ?? data.length;
  const totalPages = (0, import_react.useMemo)(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);
  const safePageIndex = totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : pageIndex;
  const getPageIndexFromUrl = (0, import_react.useCallback)(() => {
    if (!enableQueryParams || typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);
  const updateUrlPage = (0, import_react.useCallback)(
    (nextPageIndex) => {
      if (!enableQueryParams || typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      params.set(pageQueryKey, String(nextPageIndex + 1));
      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.pushState({}, "", newUrl);
    },
    [enableQueryParams, pageQueryKey]
  );
  const setPage = (0, import_react.useCallback)(
    (nextPageIndex) => {
      const safeNextPageIndex = Math.max(
        0,
        Math.min(nextPageIndex, totalPages - 1)
      );
      setPageIndex(safeNextPageIndex);
      updateUrlPage(safeNextPageIndex);
      setRowSelection({});
    },
    [totalPages, updateUrlPage]
  );
  (0, import_react.useEffect)(() => {
    setPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, [getPageIndexFromUrl]);
  (0, import_react.useEffect)(() => {
    if (!enableQueryParams) return;
    const handlePopState = () => {
      setPageIndex(getPageIndexFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, getPageIndexFromUrl]);
  (0, import_react.useEffect)(() => {
    if (!fetchUrl || !hasMounted) return;
    const controller = new AbortController();
    async function loadData() {
      try {
        setIsLoading(true);
        const url = new URL(fetchUrl);
        url.searchParams.set("page", String(safePageIndex + 1));
        url.searchParams.set("limit", String(pageSize));
        const response = await fetch(url.toString(), {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error("Failed to fetch table data");
        }
        const result = await response.json();
        setInternalData(result.items);
        setInternalTotal(result.total);
      } catch (error) {
        if (!controller.signal.aborted) {
          setInternalData([]);
          setInternalTotal(0);
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      controller.abort();
    };
  }, [fetchUrl, hasMounted, safePageIndex, pageSize]);
  const table = (0, import_table_core.useTableCore)({
    data: tableData,
    columns,
    sorting,
    onSortingChange: setSorting,
    pagination: {
      pageIndex: isServerPagination ? 0 : safePageIndex,
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
    manualPagination: isServerPagination,
    pageCount: totalPages
  });
  const rows = table.getRowModel().rows;
  const showingFrom = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
  const showingTo = totalRows === 0 ? 0 : Math.min(showingFrom + tableData.length - 1, totalRows);
  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;
  if (!hasMounted) {
    return null;
  }
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-40";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-collapse text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-10 bg-[#F3F4F6]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-b border-[#E5E7EB]", children: [
        enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-12 px-2.5 py-2.5 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            className: "h-4 w-4 cursor-pointer rounded border-[#CBD5E1]"
          }
        ) }),
        headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "th",
          {
            className: "px-2.5 py-2.5 text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
            children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                disabled: !enableSorting || !header.column.getCanSort(),
                className: "flex w-full items-center justify-center gap-2 bg-transparent p-0 disabled:cursor-default",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_react_table.flexRender)(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }),
                  enableSorting && header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 text-[11px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, {}) })
                ]
              }
            )
          },
          header.id
        ))
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: columns.length + (enableRowSelection ? 1 : 0),
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: "Loading..."
        }
      ) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: columns.length + (enableRowSelection ? 1 : 0),
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: emptyMessage
        }
      ) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "tr",
        {
          className: "border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] last:border-b-0",
          children: [
            enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-2.5 py-2 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-4 w-4 cursor-pointer rounded border-[#CBD5E1] disabled:opacity-40"
              }
            ) }),
            row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "td",
              {
                className: "px-2.5 py-2 text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]",
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
    enablePagination && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-center bg-white px-5 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-bold text-black", children: [
          showingFrom,
          "-",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-black", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 text-sm text-[#64748B]", children: [
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mx-2", children: [
          "Page",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-black", children: safePageIndex + 1 }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-black", children: totalPages })
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table
});
