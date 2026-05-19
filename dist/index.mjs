// src/Table.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender
} from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import { useTableCore } from "@prospero/table-core";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const [hasMounted, setHasMounted] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [internalData, setInternalData] = useState([]);
  const [internalTotal, setInternalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const tableData = isServerPagination ? internalData : data;
  const totalRows = isServerPagination ? internalTotal : total ?? data.length;
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalRows / pageSize));
  }, [totalRows, pageSize]);
  const safePageIndex = totalRows > 0 ? Math.max(0, Math.min(pageIndex, totalPages - 1)) : pageIndex;
  const getPageIndexFromUrl = useCallback(() => {
    if (!enableQueryParams || typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  }, [enableQueryParams, pageQueryKey]);
  const updateUrlPage = useCallback(
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
  const setPage = useCallback(
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
  useEffect(() => {
    setPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, [getPageIndexFromUrl]);
  useEffect(() => {
    if (!enableQueryParams) return;
    const handlePopState = () => {
      setPageIndex(getPageIndexFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, getPageIndexFromUrl]);
  useEffect(() => {
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
  const table = useTableCore({
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
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[18px] text-black hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40";
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#D1D5DB] bg-white font-sans", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-10 bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#E5E7EB]", children: [
        enableRowSelection && /* @__PURE__ */ jsx("th", { className: "w-12 px-5 py-3 text-center", children: /* @__PURE__ */ jsx(
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
            className: "h-[18px] w-[18px] cursor-pointer rounded border border-[#D1D5DB]"
          }
        ) }),
        headerGroup.headers.map((header) => {
          const isSorted = header.column.getIsSorted();
          return /* @__PURE__ */ jsx(
            "th",
            {
              className: `px-5 py-3 text-left align-middle text-[12px] font-semibold uppercase leading-5 tracking-[0.04em] ${isSorted ? "bg-[#F1F5F9] text-[#334155]" : "text-[#64748B]"}`,
              children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: header.column.getToggleSortingHandler(),
                  disabled: !enableSorting || !header.column.getCanSort(),
                  className: "flex w-full items-center gap-2 bg-transparent p-0 text-left disabled:cursor-default",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    ) }),
                    enableSorting && header.column.getCanSort() && /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `shrink-0 text-[10px] ${isSorted ? "text-[#475569]" : "text-[#CBD5E1]"}`,
                        children: isSorted === "asc" ? /* @__PURE__ */ jsx(FaSortUp, {}) : isSorted === "desc" ? /* @__PURE__ */ jsx(FaSortDown, {}) : /* @__PURE__ */ jsx(FaSort, {})
                      }
                    )
                  ]
                }
              )
            },
            header.id
          );
        })
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length + (enableRowSelection ? 1 : 0),
          className: "px-5 py-10 text-center text-sm text-[#64748B]",
          children: "Loading..."
        }
      ) }) : rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length + (enableRowSelection ? 1 : 0),
          className: "px-5 py-10 text-center text-sm text-[#64748B]",
          children: emptyMessage
        }
      ) }) : rows.map((row, rowIndex) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: `h-[48px] border-b border-[#E5E7EB] transition-colors hover:bg-[#F8FAFC] last:border-b-0 ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`,
          children: [
            enableRowSelection && /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-center", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-[18px] w-[18px] cursor-pointer rounded border border-[#D1D5DB] disabled:opacity-40"
              }
            ) }),
            row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-5 py-3 text-left align-middle text-[13px] font-normal leading-5 text-slate-600",
                children: flexRender(
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
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center border-t border-[#E5E7EB] bg-white px-3 py-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#111827]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#111827]", children: [
          showingFrom,
          "-",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#111827]", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-[#111827]", children: [
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
            onClick: () => setPage(safePageIndex - 1),
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm text-[#64748B]", children: [
          /* @__PURE__ */ jsx("span", { children: "Page" }),
          /* @__PURE__ */ jsx("span", { className: "flex h-8 min-w-12 items-center justify-center rounded-md border border-[#D1D5DB] bg-white px-3 font-semibold text-black", children: safePageIndex + 1 }),
          /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(safePageIndex + 1),
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage(totalPages - 1),
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
