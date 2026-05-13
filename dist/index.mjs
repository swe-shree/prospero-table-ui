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
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;
  const totalCount = total ?? data.length;
  const totalPages = pageCount ?? Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = pageIndex + 1;
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex + 1 < totalPages;
  const showingFrom = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = totalCount === 0 ? 0 : Math.min(showingFrom + data.length - 1, totalCount);
  const updatePage = (nextPageIndex) => {
    const safePageIndex = Math.max(
      0,
      Math.min(nextPageIndex, totalPages - 1)
    );
    onPaginationChange?.({
      pageIndex: safePageIndex,
      pageSize
    });
  };
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
            onClick: () => updatePage(0),
            disabled: !canPreviousPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: "<<"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => updatePage(pageIndex - 1),
            disabled: !canPreviousPage,
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
            onClick: () => updatePage(pageIndex + 1),
            disabled: !canNextPage,
            className: "rounded border border-[#E5E7EB] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
            children: ">"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => updatePage(totalPages - 1),
            disabled: !canNextPage,
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
