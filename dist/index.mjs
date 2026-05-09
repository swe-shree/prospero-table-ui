// src/Table.tsx
import { flexRender } from "@tanstack/react-table";
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
  total = data.length
}) {
  const table = useTableCore({
    data,
    columns,
    pagination: {
      pageIndex: 0,
      pageSize
    },
    enableSorting: true,
    enablePagination: true,
    enableSearching: true
  });
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPage = pageIndex + 1;
  const totalPages = table.getPageCount();
  const showingFrom = total === 0 ? 0 : pageIndex * pageSize + 1;
  const showingTo = Math.min((pageIndex + 1) * pageSize, total);
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[1100px] border-collapse font-[Inter,sans-serif]", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#E5E7EB]", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          className: "whitespace-nowrap border-r border-[#E5E7EB] px-[12px] py-[14px] text-left align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B] last:border-r-0",
          children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              className: "flex w-full items-center justify-between gap-2 border-0 bg-transparent p-0 text-left font-[Inter,sans-serif] text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
              children: [
                /* @__PURE__ */ jsx("span", { children: flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ) }),
                header.column.getCanSort() && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-[#94A3B8]", children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(FaSortDown, {}) : /* @__PURE__ */ jsx(FaSort, {}) })
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
          className: "px-10 py-10 text-center text-sm text-[#64748B]",
          children: "No data found"
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#E5E7EB] last:border-b-0", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
        "td",
        {
          className: "border-r border-[#E5E7EB] px-[12px] py-[14px] align-middle text-[12px] font-normal leading-[18px] text-[#1E293B] last:border-r-0",
          children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )
        },
        cell.id
      )) }, row.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-4 font-[Inter,sans-serif]", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[14px] font-normal text-[#64748B]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: total.toLocaleString() }),
        " ",
        "documents"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[14px] text-[#64748B]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.firstPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "whitespace-nowrap text-[14px] text-[#64748B]", children: [
          "Page",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.lastPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#64748B] disabled:cursor-not-allowed disabled:opacity-40",
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
