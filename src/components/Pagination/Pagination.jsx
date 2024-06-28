import React from 'react';
import useStyles from './style';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const classes = useStyles();

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${classes.pageNumber} ${i === currentPage ? classes.activePage : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={classes.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={classes.pageButton}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classes.pageButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
