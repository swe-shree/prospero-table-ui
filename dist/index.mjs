// src/Table.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender
} from "@tanstack/react-table";
import clsx from "clsx";
import {
  FaSort,
  FaSortDown,
  FaSortUp
} from "react-icons/fa";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import { useTableCore } from "@prospero/table-core";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const [hasMounted, setHasMounted] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [internalData, setInternalData] = useState([]);
  const [internalTotal, setInternalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const tableData = isServerPagination ? internalData : data;
  const totalRows = isServerPagination ? internalTotal : total ?? data.length;
  const generatedColumns = useMemo(() => {
    if (!tableData || tableData.length === 0) {
      return columns;
    }
    const autoColumns = Object.keys(
      tableData[0]
    ).filter(
      (key) => !hiddenColumns.includes(key)
    ).map((key) => ({
      accessorKey: key,
      header: key.replace(/_/g, " ").toUpperCase()
    }));
    return [...autoColumns, ...columns];
  }, [columns, tableData]);
  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(totalRows / pageSize)
    );
  }, [totalRows, pageSize]);
  const safePageIndex = totalRows > 0 ? Math.max(
    0,
    Math.min(pageIndex, totalPages - 1)
  ) : pageIndex;
  const getPageIndexFromUrl = useCallback(() => {
    if (!enableQueryParams || typeof window === "undefined") {
      return 0;
    }
    const params = new URLSearchParams(
      window.location.search
    );
    const pageFromUrl = Number(
      params.get(pageQueryKey) || "1"
    );
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);
  const updateUrlPage = useCallback(
    (nextPageIndex) => {
      if (!enableQueryParams || typeof window === "undefined") {
        return;
      }
      const params = new URLSearchParams(
        window.location.search
      );
      params.set(
        pageQueryKey,
        String(nextPageIndex + 1)
      );
      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.pushState(
        {},
        "",
        newUrl
      );
    },
    [enableQueryParams, pageQueryKey]
  );
  const setPage = useCallback(
    (nextPageIndex) => {
      const safeNextPageIndex = Math.max(
        0,
        Math.min(
          nextPageIndex,
          totalPages - 1
        )
      );
      setPageIndex(safeNextPageIndex);
      updateUrlPage(safeNextPageIndex);
      setRowSelection({});
    },
    [totalPages, updateUrlPage]
  );
  useEffect(() => {
    setPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, [getPageIndexFromUrl]);
  useEffect(() => {
    if (!enableQueryParams) return;
    const handlePopState = () => {
      setPageIndex(getPageIndexFromUrl());
    };
    window.addEventListener(
      "popstate",
      handlePopState
    );
    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, [
    enableQueryParams,
    getPageIndexFromUrl
  ]);
  useEffect(() => {
    if (!fetchUrl || !hasMounted) return;
    const controller = new AbortController();
    async function loadData() {
      try {
        setIsLoading(true);
        const url = new URL(fetchUrl);
        url.searchParams.set(
          "page",
          String(safePageIndex + 1)
        );
        url.searchParams.set(
          "limit",
          String(pageSize)
        );
        const response = await fetch(
          url.toString(),
          {
            signal: controller.signal
          }
        );
        if (!response.ok) {
          throw new Error(
            "Failed to fetch table data"
          );
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
  }, [
    fetchUrl,
    hasMounted,
    safePageIndex,
    pageSize
  ]);
  const table = useTableCore({
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
  const showingTo = totalRows === 0 ? 0 : Math.min(
    showingFrom + tableData.length - 1,
    totalRows
  );
  const canPrev = safePageIndex > 0;
  const canNext = safePageIndex < totalPages - 1;
  if (!hasMounted) {
    return null;
  }
  const paginationButtonClass = "flex h-9 w-9 items-center justify-center rounded-md border border-slate-[#CBD5E1] bg-white text-sm text-black shadow-none transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden rounded-xl border border-slate-200 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto border-b border-[#F1F5F9]", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-20", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxs("tr", { children: [
        enableRowSelection && /* @__PURE__ */ jsx(
          "th",
          {
            className: clsx(
              "bg-slate-50 border-b border-slate-100",
              "px-4 py-3 text-center",
              "text-[11px]",
              "font-semibold uppercase tracking-wider text-slate-600"
            ),
            children: /* @__PURE__ */ jsx(
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
                className: "h-4 w-4 rounded border border-slate-300"
              }
            )
          }
        ),
        headerGroup.headers.map(
          (header) => {
            const canSort = header.column.getCanSort();
            const isSorted = header.column.getIsSorted();
            return /* @__PURE__ */ jsx(
              "th",
              {
                onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
                className: clsx(
                  "bg-slate-50 border-b border-slate-100",
                  "px-4 py-3 text-left",
                  "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
                  canSort && "cursor-pointer transition-colors hover:bg-slate-100 hover:text-slate-900"
                ),
                children: /* @__PURE__ */ jsxs("div", { className: "flex w-fit items-center gap-2 text-nowrap", children: [
                  header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  canSort && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: clsx(
                        "inline-flex h-4 w-4 items-center justify-center",
                        isSorted ? "text-slate-900" : "text-slate-400"
                      ),
                      children: isSorted === "asc" ? /* @__PURE__ */ jsx(FaSortUp, { className: "h-3 w-3" }) : isSorted === "desc" ? /* @__PURE__ */ jsx(FaSortDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(FaSort, { className: "h-3 w-3" })
                    }
                  )
                ] })
              },
              header.id
            );
          }
        )
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { className: "text-xs", children: isLoading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: generatedColumns.length + (enableRowSelection ? 1 : 0),
          className: "px-4 py-10 text-center text-sm text-slate-400",
          children: "Loading..."
        }
      ) }) : rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: generatedColumns.length + (enableRowSelection ? 1 : 0),
          className: "px-4 py-10 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) : rows.map(
        (row, rowIndex) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: clsx(
              "group transition-colors",
              rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
              "hover:bg-blue-50"
            ),
            children: [
              enableRowSelection && /* @__PURE__ */ jsx("td", { className: "border-b border-slate-50 px-4 py-2.5 text-center", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  onChange: row.getToggleSelectedHandler(),
                  className: "h-4 w-4 rounded border border-slate-300"
                }
              ) }),
              row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "border-b border-slate-50 px-4 py-2.5 text-left font-normal text-slate-700",
                  children: cell.column.id === "filename" ? String(
                    cell.getValue()
                  ).replace(
                    ".pdf",
                    ""
                  ).replace(
                    /\s+\d+$/,
                    ""
                  ) : flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                },
                cell.id
              ))
            ]
          },
          row.id
        )
      ) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center bg-white px-4 py-4", children: [
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
            onClick: () => setPage(
              safePageIndex - 1
            ),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx("span", { children: "Page" }),
          /* @__PURE__ */ jsx("span", { className: "flex h-9 min-w-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 font-semibold text-black shadow-none", children: safePageIndex + 1 }),
          /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(
              safePageIndex + 1
            ),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(
              totalPages - 1
            ),
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
export {
  Table
};
