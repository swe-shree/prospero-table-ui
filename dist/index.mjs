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
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white font-[Inter,sans-serif]", children: [
    /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#E5E7EB]", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          className: "px-[10px] py-[10px] text-center align-middle text-[12px] font-medium uppercase leading-[13.48px] tracking-[0.51px] text-[#64748B]",
          children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              className: "mx-auto flex cursor-pointer items-center justify-center gap-2 border-0 bg-transparent font-[Inter,sans-serif] text-[#64748B]",
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
          className: "px-10 py-10 text-center text-[#6B7280]",
          children: "No data found"
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#E5E7EB]", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
        "td",
        {
          className: "px-[10px] py-2 text-center align-middle text-[12px] leading-[13.48px] tracking-[0px] text-[#1E293B]",
          children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )
        },
        cell.id
      )) }, row.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center border-t border-[#E5E7EB] bg-white px-6 py-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "absolute left-6 text-sm text-[#6B7280]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-boldtext-[#111827]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: total.toLocaleString() }),
        " ",
        "documents"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#6B7280]", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => table.firstPage(), children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {}) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => table.previousPage(), children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {}) }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#6B7280]", children: [
          "Page",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => table.nextPage(), children: /* @__PURE__ */ jsx(MdArrowForwardIos, {}) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => table.lastPage(), children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowRight, {}) })
      ] })
    ] })
  ] });
}
export {
  Table
};
