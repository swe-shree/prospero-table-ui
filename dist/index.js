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
  Table: () => Table
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
var hiddenColumns = [
  "_id",
  "id",
  "job_id",
  "created_at",
  "updated_at"
];
function Table({
  columns = [],
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
  const generatedColumns = (0, import_react.useMemo)(() => {
    if (!tableData || tableData.length === 0) {
      return columns;
    }
    const autoColumns = Object.keys(tableData[0]).filter((key) => !hiddenColumns.includes(key)).map((key) => ({
      accessorKey: key,
      header: key.replace(/_/g, " ").toUpperCase()
    }));
    return [...autoColumns, ...columns];
  }, [columns, tableData]);
  const totalPages = (0, import_react.useMemo)(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);
  const safePageIndex = totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : pageIndex;
  const getPageIndexFromUrl = (0, import_react.useCallback)(() => {
    if (!enableQueryParams || typeof window === "undefined") {
      return 0;
    }
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);
  const updateUrlPage = (0, import_react.useCallback)(
    (nextPageIndex) => {
      if (!enableQueryParams || typeof window === "undefined") {
        return;
      }
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
    columns: generatedColumns,
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
  const paginationButtonClass = "flex h-9 w-9 items-center justify-center rounded-none border border-[#CBD5E1] bg-white text-sm text-black shadow-none transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "sticky top-0 z-20", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        enableRowSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "th",
          {
            className: (0, import_clsx.default)(
              "border-b border-[#CBD5E1] bg-white",
              "px-4 py-3 text-center",
              "text-[11px]",
              "font-semibold uppercase tracking-wider text-slate-600"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            )
          }
        ),
        headerGroup.headers.map((header) => {
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
                canSort && "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-fit items-center gap-2 text-nowrap", children: [
                header.isPlaceholder ? null : (0, import_react_table.flexRender)(
                  header.column.columnDef.header,
                  header.getContext()
                ),
                canSort && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    className: (0, import_clsx.default)(
                      "inline-flex h-4 w-4 items-center justify-center",
                      isSorted ? "text-slate-900" : "text-slate-400"
                    ),
                    children: isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, { className: "h-3 w-3" }) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, { className: "h-3 w-3" })
                  }
                )
              ] })
            },
            header.id
          );
        })
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { className: "text-xs", children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: generatedColumns.length + (enableRowSelection ? 1 : 0),
          className: "border-b border-[#CBD5E1] px-4 py-10 text-center text-sm text-slate-400",
          children: "Loading..."
        }
      ) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "td",
        {
          colSpan: generatedColumns.length + (enableRowSelection ? 1 : 0),
          className: "border-b border-[#CBD5E1] px-4 py-10 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) : rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
            row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "td",
              {
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
      )) })
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-9 min-w-9 items-center justify-center rounded-none border border-[#CBD5E1] bg-white px-3 font-semibold text-black shadow-none", children: safePageIndex + 1 }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table
});
