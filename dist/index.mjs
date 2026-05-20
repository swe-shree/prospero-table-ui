// src/Table.tsx
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Table({
  data,
  columns
}) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  const paginationButtonClass = "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden rounded-2xl border-2 border-slate-300 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] w-full overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-full border-separate border-spacing-0", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-20 bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => {
        const canSort = header.column.getCanSort();
        const isSorted = header.column.getIsSorted();
        return /* @__PURE__ */ jsx(
          "th",
          {
            onClick: canSort ? header.column.getToggleSortingHandler() : void 0,
            className: `border-b border-slate-200 bg-[#F8FAFC] px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700 ${canSort ? "cursor-pointer select-none" : ""}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              flexRender(
                header.column.columnDef.header,
                header.getContext()
              ),
              canSort && /* @__PURE__ */ jsx(Fragment, { children: isSorted === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-3.5 w-3.5 text-slate-700" }) : isSorted === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "h-3.5 w-3.5 text-slate-700" }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3.5 w-3.5 text-slate-400" }) })
            ] })
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row, index) => /* @__PURE__ */ jsx(
        "tr",
        {
          className: index % 2 === 0 ? "bg-white" : "bg-slate-100",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
            "td",
            {
              className: "border-b border-slate-200 px-5 py-4 text-sm text-slate-700",
              children: flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-slate-200 px-5 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-600", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: table.getRowModel().rows.length }),
        " ",
        "rows"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-slate-700", children: [
          /* @__PURE__ */ jsx("span", { children: "Page" }),
          /* @__PURE__ */ jsx("div", { className: "flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm", children: table.getState().pagination.pageIndex + 1 }),
          /* @__PURE__ */ jsxs("span", { children: [
            "of ",
            table.getPageCount()
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: paginationButtonClass,
            onClick: () => table.setPageIndex(
              table.getPageCount() - 1
            ),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ jsx(ChevronsRight, { className: "h-5 w-5" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  Table
};
