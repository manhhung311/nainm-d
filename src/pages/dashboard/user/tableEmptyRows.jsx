//--------------------------------------------------------------------------
function tableEmptyRows(page, rowsPerPage, arrayLength) {
  return page > 0 ? Math.max(0, rowsPerPage - arrayLength) : 0;
}
