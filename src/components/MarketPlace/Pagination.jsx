import styled from "styled-components";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <Pages>
      {[...Array(totalPages).keys()].map((page) => {
        return (
          <PageButton
            onClick={() => setCurrentPage(page)}
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
`;

const PageButton = styled.button`
  background-color: ${(props) =>
    props.$currentPage === props.$page ? "blue" : "#0095ff"};
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
