import styled from "styled-components";

export default function Pagination({
  totalPages,
  searchParams,
  setSearchParams,
}) {
  let currentPage = Number(searchParams.get("page"));
  function handlePageChange(page) {
    const newParams = {};

    searchParams.forEach((value, key) => (newParams[key] = value));

    newParams.page = page + 1;
    setSearchParams(newParams, { replace: true });
  }

  let left = 0;
  let right = 5;

  if (currentPage <= 4) {
    left = 0;
    right = 5;
  } else if (totalPages - 4 < currentPage && currentPage < totalPages + 1) {
    left = totalPages - 5;
    right = totalPages;
  } else {
    left = currentPage - 3;
    right = currentPage + 2;
  }

  return (
    <Pages>
      {[...Array(totalPages).keys()].slice(left, right).map((page) => {
        return (
          <PageButton
            onClick={() => handlePageChange(page)}
            $currentPage={currentPage}
            $page={page}
            key={page}
          >
            {page + 1}
          </PageButton>
        );
      })}
    </Pages>
  );
}

const Pages = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 150px;
`;

const PageButton = styled.button`
  background-color: ${(props) =>
    Number(props.$currentPage) === props.$page + 1 ? "blue" : "#0095ff"};
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Rajdhani";
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: #07c;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.45);
  }
`;
