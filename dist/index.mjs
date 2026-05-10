// src/Table.tsx
import { useState, useCallback } from "react";
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
  pageSize = 10,
  total,
  pageIndex: controlledPageIndex,
  onPageChange,
  rowLabel = "documents"
}) {
  const isControlled = controlledPageIndex !== void 0 && onPageChange !== void 0;
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  const pageIndex = isControlled ? controlledPageIndex : internalPageIndex;
  const [sorting, setSorting] = useState([]);
  const table = useTableCore({
    data,
    columns,
    sorting,
    onSortingChange: setSorting,
    pagination: {
      pageIndex,
      pageSize
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      if (isControlled) {
        onPageChange(next.pageIndex);
      } else {
        setInternalPageIndex(next.pageIndex);
      }
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: false
  });
  const totalRows = total ?? data.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalRows / pageSize)
  );
  const showingFrom = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min(
    (pageIndex + 1) * pageSize,
    totalRows
  );
  const rows = table.getRowModel().rows;
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;
  const setPage = useCallback(
    (next) => {
      if (isControlled) {
        onPageChange(next);
      } else {
        setInternalPageIndex(next);
        table.setPageIndex(next);
      }
    },
    [isControlled, onPageChange, table]
  );
  const goToFirstPage = () => setPage(0);
  const goToPreviousPage = () => {
    if (canPrev) {
      setPage(pageIndex - 1);
    }
  };
  const goToNextPage = () => {
    if (canNext) {
      setPage(pageIndex + 1);
    }
  };
  const goToLastPage = () => setPage(totalPages - 1);
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map(
        (headerGroup) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "border-b border-[#E5E7EB]",
            children: [
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
              headerGroup.headers.map(
                (header) => /* @__PURE__ */ jsx(
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
                )
              )
            ]
          },
          headerGroup.id
        )
      ) }),
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
            row.getVisibleCells().map(
              (cell) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "px-[10px] py-[8px] text-center align-middle text-[12px] font-normal leading-[18px] text-[#1E293B]",
                  children: flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                },
                cell.id
              )
            )
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
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: pageIndex + 1 }),
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
      ] })
    ] })
  ] });
}
export {
  Table
};
