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
  useTableCore: () => useTableCore
});
module.exports = __toCommonJS(index_exports);

// src/useTableCore.ts
var import_react_table = require("@tanstack/react-table");
function useTableCore({
  data,
  columns,
  sorting = [],
  onSortingChange,
  pagination = {
    pageIndex: 0,
    pageSize: 10
  },
  onPaginationChange,
  globalFilter = "",
  onGlobalFilterChange,
  enableSorting = true,
  enablePagination = true,
  enableSearching = true
}) {
  return (0, import_react_table.useReactTable)({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter
    },
    onSortingChange,
    onPaginationChange,
    onGlobalFilterChange,
    enableSorting,
    enableGlobalFilter: enableSearching,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    ...enableSorting && {
      getSortedRowModel: (0, import_react_table.getSortedRowModel)()
    },
    ...enablePagination && {
      getPaginationRowModel: (0, import_react_table.getPaginationRowModel)()
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTableCore
});
