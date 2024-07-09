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
    props.$currentPage === props.$page ? "blue" : "red"};
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1em;
  &:hover {
    background-color: ${(props) =>
      props.$currentPage === props.$page ? "darkslateblue" : "gray"};
  }
`;
