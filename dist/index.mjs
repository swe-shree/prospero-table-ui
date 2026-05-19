// src/Table.tsx
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import {
  FaSort,
  FaSortDown,
  FaSortUp,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";
import { jsx, jsxs } from "react/jsx-runtime";
function Table({
  data,
  table,
  emptyMessage = "No records to display",
  firstColumnColor,
  enablePagination = true,
  rowLabel = "documents",
  showingFrom = 0,
  showingTo = 0,
  totalRows = data?.length ?? 0,
  currentPage = 1,
  totalPages = 1,
  canPrev = false,
  canNext = false,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage
}) {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length ?? 1;
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white text-black shadow-sm transition-colors hover:bg-[#F8FAFC] disabled:opacity-40";
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => {
        const canSort = header.column.getCanSort();
        const isSorted = header.column.getIsSorted();
        return /* @__PURE__ */ jsx(
          "th",
          {
            onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
            className: clsx(
              "border-b border-[#CBD5E1] bg-[#F8FAFC] px-3 py-3 text-left",
              "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
              canSort && "cursor-pointer transition-colors hover:bg-slate-100 hover:text-slate-900",
              header.column.columnDef.meta?.className
            ),
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex w-fit items-center gap-2 text-nowrap",
                  header.column.columnDef.meta?.headerClassName
                ),
                children: [
                  header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  canSort && /* @__PURE__ */ jsx("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ jsx(FaSortUp, { className: "h-3 w-3 text-slate-700" }) : isSorted === "desc" ? /* @__PURE__ */ jsx(FaSortDown, { className: "h-3 w-3 text-slate-700" }) : /* @__PURE__ */ jsx(FaSort, { className: "h-3 w-3 text-slate-400" }) })
                ]
              }
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { className: "text-xs", children: data && rows.length > 0 ? rows.map((row, rowIndex) => /* @__PURE__ */ jsx(
        "tr",
        {
          className: clsx(
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#F1F5F9]",
            "group hover:bg-blue-50"
          ),
          children: row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ jsx(
            "td",
            {
              style: {
                ...cellIndex === 1 && firstColumnColor ? {
                  color: firstColumnColor,
                  fontWeight: 600
                } : {}
              },
              className: clsx(
                "border-b border-[#E2E8F0] px-3 py-2 text-left font-normal text-slate-700",
                cell.column.columnDef.meta?.className
              ),
              children: cell.column.id === "filename" ? String(cell.getValue()).replace(".pdf", "").replace(/\s+\d+$/, "") : flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: visibleColumnsCount,
          className: "px-3 py-8 text-center text-sm text-slate-400",
          children: emptyMessage
        }
      ) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center border-t border-[#CBD5E1] bg-white px-2 py-2", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-500", children: [
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
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onFirstPage,
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(FaAngleDoubleLeft, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onPrevPage,
            disabled: !canPrev,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(FaAngleLeft, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] text-slate-500", children: [
          /* @__PURE__ */ jsx("span", { children: "Page" }),
          /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white font-semibold text-black shadow-sm", children: currentPage }),
          /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
            "of ",
            totalPages
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onNextPage,
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(FaAngleRight, { className: "h-4 w-4 text-black" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onLastPage,
            disabled: !canNext,
            className: paginationButtonClass,
            children: /* @__PURE__ */ jsx(FaAngleDoubleRight, { className: "h-4 w-4 text-black" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", {})
    ] })
  ] });
}
var Table_default = Table;
export {
  Table,
  Table_default as default
};
