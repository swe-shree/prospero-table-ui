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
  const showingTo = Math.min(
    (pageIndex + 1) * pageSize,
    total
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: "100%",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "table",
          {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            },
            children: [
              /* @__PURE__ */ jsx(
                "thead",
                {
                  style: {
                    backgroundColor: "#F8FAFC"
                  },
                  children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(
                    "tr",
                    {
                      style: {
                        borderBottom: "1px solid #E5E7EB"
                      },
                      children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
                        "th",
                        {
                          style: {
                            padding: "10px 10px",
                            textAlign: "center",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "#475569"
                          },
                          children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: header.column.getToggleSortingHandler(),
                              style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                margin: "0 auto",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#475569"
                              },
                              children: [
                                /* @__PURE__ */ jsx("span", { children: flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                ) }),
                                header.column.getCanSort() && /* @__PURE__ */ jsx(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "11px",
                                      color: "#94A3B8"
                                    },
                                    children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(FaSortDown, {}) : /* @__PURE__ */ jsx(FaSort, {})
                                  }
                                )
                              ]
                            }
                          )
                        },
                        header.id
                      ))
                    },
                    headerGroup.id
                  ))
                }
              ),
              /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
                "td",
                {
                  colSpan: columns.length,
                  style: {
                    padding: "40px",
                    textAlign: "center",
                    color: "#6B7280"
                  },
                  children: "No data found"
                }
              ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
                "tr",
                {
                  style: {
                    borderBottom: "1px solid #E5E7EB"
                  },
                  children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
                    "td",
                    {
                      style: {
                        padding: "8px 10px",
                        textAlign: "center",
                        color: "#1E293B",
                        fontSize: "13px"
                      },
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
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 24px",
              borderTop: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    color: "#6B7280"
                  },
                  children: [
                    "Showing",
                    " ",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          fontWeight: 700,
                          color: "#111827"
                        },
                        children: showingFrom
                      }
                    ),
                    "\u2013",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          fontWeight: 700,
                          color: "#111827"
                        },
                        children: showingTo
                      }
                    ),
                    " ",
                    "of",
                    " ",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          fontWeight: 700,
                          color: "#111827"
                        },
                        children: total.toLocaleString()
                      }
                    ),
                    " ",
                    "documents"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#6B7280"
                  },
                  children: [
                    /* @__PURE__ */ jsx("button", { onClick: () => table.firstPage(), children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowLeft, {}) }),
                    /* @__PURE__ */ jsx("button", { onClick: () => table.previousPage(), children: /* @__PURE__ */ jsx(MdArrowBackIosNew, {}) }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Page",
                      " ",
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontWeight: 700,
                            color: "#111827"
                          },
                          children: currentPage
                        }
                      ),
                      " ",
                      "of",
                      " ",
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontWeight: 700,
                            color: "#111827"
                          },
                          children: totalPages
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("button", { onClick: () => table.nextPage(), children: /* @__PURE__ */ jsx(MdArrowForwardIos, {}) }),
                    /* @__PURE__ */ jsx("button", { onClick: () => table.lastPage(), children: /* @__PURE__ */ jsx(MdKeyboardDoubleArrowRight, {}) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  Table
};
