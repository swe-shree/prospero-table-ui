// src/Table.tsx
import { useState, useCallback, useEffect } from "react";
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
  const [internalPageSize, setInternalPageSize] = useState(controlledPageSize);
  const currentPageSize = internalPageSize;
  const getPageIndexFromUrl = () => {
    if (!enableQueryParams || typeof window === "undefined") {
      return 0;
    }
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get(pageQueryKey) || "1");
    return pageFromUrl > 0 ? pageFromUrl - 1 : 0;
  };
  const [hasMounted, setHasMounted] = useState(false);
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  useEffect(() => {
    setInternalPageIndex(getPageIndexFromUrl());
    setHasMounted(true);
  }, []);
  const pageIndex = isControlled ? controlledPageIndex : internalPageIndex;
  const [sorting, setSorting] = useState([]);
  const totalRows = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / currentPageSize));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const updateUrlPage = useCallback(
    (next) => {
      if (!enableQueryParams || typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      params.set(pageQueryKey, String(next + 1));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    },
    [enableQueryParams, pageQueryKey]
  );
  const setPage = useCallback(
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
  useEffect(() => {
    if (!enableQueryParams || isControlled) return;
    const handlePopState = () => {
      setInternalPageIndex(getPageIndexFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enableQueryParams, isControlled, pageQueryKey]);
  const table = useTableCore({
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
  if (!hasMounted) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#E5E7EB]", children: [
        /* @__PURE__ */ jsx("th", { className: "w-12 px-[10px] py-[10px] text-center", children: /* @__PURE__ */ jsx(
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
        headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
          "th",
          {
            className: "px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
            children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                disabled: !header.column.getCanSort(),
                className: "flex w-full items-center justify-center gap-2 bg-transparent p-0",
                children: [
                  /* @__PURE__ */ jsx("span", { children: flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }),
                  header.column.getCanSort() && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-[11px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(FaSortDown, {}) : /* @__PURE__ */ jsx(FaSort, {}) })
                ]
              }
            )
          },
          header.id
        ))
      ] }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length + 1,
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : rows.map((row) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC] last:border-b-0",
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-[10px] py-[8px] text-center", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                className: "h-4 w-4 rounded border-[#CBD5E1] disabled:opacity-40"
              }
            ) }),
            row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-[10px] py-[8px] text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]",
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
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center border-t border-[#E5E7EB] bg-white px-5 py-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#111827]", children: [
          showingFrom,
          "\u2013",
          showingTo
        ] }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: totalRows.toLocaleString() }),
        " ",
        rowLabel
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-sm text-[#64748B]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !canPrev,
            onClick: goToFirstPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !canPrev,
            onClick: goToPreviousPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Page",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: safePageIndex + 1 }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !canNext,
            onClick: goToNextPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !canNext,
            onClick: goToLastPage,
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowRight, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2 text-sm text-[#64748B]", children: [
        /* @__PURE__ */ jsx("span", { children: "Rows per page" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: currentPageSize,
            onChange: handlePageSizeChange,
            className: "h-9 rounded-md border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#111827] outline-none",
            children: pageSizeOptions.map((size) => /* @__PURE__ */ jsx("option", { value: size, children: size }, size))
          }
        )
      ] })
    ] })
  ] });
}
export {
  Table
};
