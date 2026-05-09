"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Table: () => Table
});
module.exports = __toCommonJS(index_exports);

// src/Table.tsx
var import_react_table = require("@tanstack/react-table");
var import_fa = require("react-icons/fa");
var import_md = require("react-icons/md");
var import_table_core = require("@prospero/table-core");
var import_jsx_runtime = require("react/jsx-runtime");
function Table({
  data,
  columns,
  pageSize = 10,
  total = data.length
}) {
  const table = (0, import_table_core.useTableCore)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        width: "100%",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "table",
          {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "thead",
                {
                  style: {
                    backgroundColor: "#F8FAFC"
                  },
                  children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "tr",
                    {
                      style: {
                        borderBottom: "1px solid #E5E7EB"
                      },
                      children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                          children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_react_table.flexRender)(
                                  header.column.columnDef.header,
                                  header.getContext()
                                ) }),
                                header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "11px",
                                      color: "#94A3B8"
                                    },
                                    children: header.column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortUp, {}) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSortDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaSort, {})
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "tr",
                {
                  style: {
                    borderBottom: "1px solid #E5E7EB"
                  },
                  children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "td",
                    {
                      style: {
                        padding: "8px 10px",
                        textAlign: "center",
                        color: "#1E293B",
                        fontSize: "13px"
                      },
                      children: (0, import_react_table.flexRender)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    color: "#6B7280"
                  },
                  children: [
                    "Showing",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#6B7280"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => table.firstPage(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowLeft, {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => table.previousPage(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowBackIosNew, {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                      "Page",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => table.nextPage(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdArrowForwardIos, {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => table.lastPage(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_md.MdKeyboardDoubleArrowRight, {}) })
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table
});
