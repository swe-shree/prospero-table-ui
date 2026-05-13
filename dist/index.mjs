// src/Table.tsx
import {
  flexRender
} from "@tanstack/react-table";
import { useTableCore } from "@prospero/table-core";
import { jsx, jsxs } from "react/jsx-runtime";
function Table({
  data,
  columns,
  sorting = [],
  onSortingChange,
  pagination = {
    pageIndex: 0,
    pageSize: 10
  },
  onPaginationChange,
  rowSelection = {},
  onRowSelectionChange,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = false,
  manualPagination = false,
  pageCount,
  total
}) {
  const table = useTableCore({
    data,
    columns,
    sorting,
    onSortingChange,
    pagination,
    onPaginationChange,
    rowSelection,
    onRowSelectionChange,
    enableSorting,
    enablePagination,
    enableRowSelection,
    manualPagination,
    pageCount
  });
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const goToPage = (nextPageIndex) => {
    const safePageIndex = Math.max(0, Math.min(nextPageIndex, totalPages - 1));
    onPaginationChange?.({
      pageIndex: safePageIndex,
      pageSize
    });
  };
  const showingFrom = data.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const showingTo = data.length === 0 ? 0 : showingFrom + table.getRowModel().rows.length - 1;
  const totalCount = total ?? data.length;
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ jsx("div", { className: "max-h-[500px] overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-10 bg-white", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#E5E7EB]", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          className: "px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
          children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              disabled: !header.column.getCanSort(),
              className: "flex w-full items-center justify-center gap-1 bg-transparent p-0 text-center disabled:cursor-default",
              children: [
                /* @__PURE__ */ jsx("span", { children: flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ) }),
                header.column.getCanSort() && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? "\u25B2" : header.column.getIsSorted() === "desc" ? "\u25BC" : "\u2195" })
              ]
            }
          )
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length,
          className: "px-4 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#F1F5F9]", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
        "td",
        {
          className: "px-[10px] py-[8px] text-center align-middle text-[12px] font-medium leading-[13.48px] tracking-[0.51px] text-[#1E293B]",
          children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )
        },
        cell.id
      )) }, row.id)) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#1E293B]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#1E293B]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#1E293B]", children: totalCount })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => goToPage(0),
            disabled: !table.getCanPreviousPage(),
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: "<<"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => goToPage(pageIndex - 1),
            disabled: !table.getCanPreviousPage(),
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: "<"
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "px-2 text-sm text-[#64748B]", children: [
          "Page",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#1E293B]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#1E293B]", children: totalPages })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => goToPage(pageIndex + 1),
            disabled: !table.getCanNextPage(),
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: ">"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => goToPage(totalPages - 1),
            disabled: !table.getCanNextPage(),
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: ">>"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Table
};
