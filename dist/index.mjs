// src/Table.tsx
import {
  flexRender
} from "@tanstack/react-table";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import {
  FaSort,
  FaSortDown,
  FaSortUp
} from "react-icons/fa";
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
  const showingTo = Math.min(
    (pageIndex + 1) * pageSize,
    total
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden border border-[#E5E7EB] bg-white", children: [
    /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[#F8FAFC]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(
        "tr",
        {
          className: "border-b border-[#E5E7EB]",
          children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
            "th",
            {
              className: "px-6 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-[#475569]",
              children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: header.column.getToggleSortingHandler(),
                  className: "mx-auto flex items-center justify-center gap-1.5",
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
          ))
        },
        headerGroup.id
      )) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns.length,
          className: "px-6 py-10 text-center text-sm text-[#6B7280]",
          children: "No data found"
        }
      ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        "tr",
        {
          className: "border-b border-[#E5E7EB] transition hover:bg-[#F9FAFB]",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
            "td",
            {
              className: "px-6 py-4 text-center text-[13px] text-[#1E293B]",
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
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#6B7280]", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: showingFrom }),
        "\u2013",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: showingTo }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: total.toLocaleString() }),
        " ",
        "documents"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-[#6B7280]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.firstPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            className: "flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {})
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          "Page",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: currentPage }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111827]", children: totalPages })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:opacity-40",
            children: /* @__PURE__ */ jsx(MdArrowForwardIos, {})
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => table.lastPage(),
            disabled: !table.getCanNextPage(),
            className: "flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:opacity-40",
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
