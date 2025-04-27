import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  const generatePagination = (): Array<{
    page?: number;
    isCurrent?: boolean;
    isEllipsis?: boolean;
  }> => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => ({
        page: i + 1,
        ...(i + 1 === currentPage ? { isCurrent: true } : {}),
      }));
    }

    const pages: Array<{
      page?: number;
      isCurrent?: boolean;
      isEllipsis?: boolean;
    }> = [];

    pages.push({ page: 1, isCurrent: currentPage === 1 });

    if (currentPage <= 3) {
      for (let i = 2; i <= 4; i++) {
        pages.push({ page: i, isCurrent: i === currentPage });
      }
      pages.push({ isEllipsis: true });
    } else if (currentPage >= totalPage - 2) {
      pages.push({ isEllipsis: true });
      for (let i = totalPage - 3; i < totalPage; i++) {
        pages.push({ page: i, isCurrent: i === currentPage });
      }
    } else {
      pages.push({ isEllipsis: true });
      pages.push({ page: currentPage - 1 });
      pages.push({ page: currentPage, isCurrent: true });
      pages.push({ page: currentPage + 1 });
      pages.push({ isEllipsis: true });
    }

    pages.push({ page: totalPage, isCurrent: currentPage === totalPage });

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#60;
      </button>
      {generatePagination().map((item, i) =>
        item.isEllipsis ? (
          <span key={i} className="ellipsis">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(item.page!)}
            className={`page ${item.isCurrent ? 'active' : ''}`}
            disabled={item.page === currentPage}
          >
            {item.page}
          </button>
        )
      )}
      <button
        className="page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
