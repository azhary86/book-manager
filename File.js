exports.sortBooksByYear = (books) => {
  return books.sort((a, b) => a.year - b.year);
};

