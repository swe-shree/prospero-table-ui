// src/Table.tsx
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { jsx, jsxs } from "react/jsx-runtime";
function TableContainer({
  data,
  table,
  emptyMessage = "No records to display",
  firstColumnColor
}) {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const visibleColumnsCount = table.getVisibleLeafColumns?.().length ?? 1;
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden rounded-none border border-[#CBD5E1] bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-separate border-spacing-0 text-sm", children: [
    /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-20", children: headerGroups.map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => {
      const canSort = header.column.getCanSort();
      const isSorted = header.column.getIsSorted();
      return /* @__PURE__ */ jsx(
        "th",
        {
          onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
          className: clsx(
            "border-b border-[#CBD5E1] bg-white",
            "px-4 py-3 text-left",
            "text-[11px] font-semibold uppercase tracking-wider text-slate-600",
            canSort && "cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900",
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
                canSort && /* @__PURE__ */ jsx("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: isSorted === "asc" ? /* @__PURE__ */ jsx(FaSortUp, { className: "h-3 w-3 text-slate-900" }) : isSorted === "desc" ? /* @__PURE__ */ jsx(FaSortDown, { className: "h-3 w-3 text-slate-900" }) : /* @__PURE__ */ jsx(FaSort, { className: "h-3 w-3 text-slate-400" }) })
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
          "group transition-colors",
          rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50",
          "hover:bg-blue-50"
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
              "border-b border-[#CBD5E1] px-4 py-2.5 text-left font-normal text-slate-700",
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
        className: "px-4 py-10 text-center text-sm text-slate-400",
        children: emptyMessage
      }
    ) }) })
  ] }) }) });
}
var Table_default = TableContainer;
export {
  Table_default as Table,
  Table_default as TableContainer
};
