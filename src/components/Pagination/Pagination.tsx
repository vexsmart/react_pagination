import React from 'react';

interface Props {
  perPage: number;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage = 1,
  total,
  onPageChange,
}) => {
  const totalInPage: number = Math.ceil(total / perPage);
  const pages: number[] = Array.from(
    { length: totalInPage },
    (_, index) => index + 1,
  );
  let clickedPage = currentPage;

  if (clickedPage > pages.length || clickedPage <= 0) {
    clickedPage = 1;
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${clickedPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={clickedPage === 1}
            onClick={() => {
              if (clickedPage > 1) {
                onPageChange(clickedPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${clickedPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (clickedPage === page) {
                  return;
                }
                onPageChange(page)
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${clickedPage === pages.length ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={clickedPage === pages.length}
            onClick={() => {
              if (clickedPage < pages.length) {
                onPageChange(clickedPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
