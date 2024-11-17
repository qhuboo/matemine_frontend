import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";
import FilterDrawer from "./FilterDrawer";
import GameGrid from "./GameGrid";
import { QUERIES } from "../../constants";
import { Filter } from "react-feather";
import useToggle from "../../hooks/use-toggle";
import { useQuery } from "@tanstack/react-query";
import useURLSync from "../../hooks/useURLSync";

function MarketPlace() {
  console.log("render");
  // Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  // Page State
  const [page, setPage] = useState(() => {});
  const [perPage, setPerPage] = useURLSync(
    searchParams,
    setSearchParams,
    "perPage",
    "string",
    "12"
  );

  // Sort state
  const [sort, setSort] = useURLSync(
    searchParams,
    setSearchParams,
    "sort",
    "string",
    "alpha-desc"
  );

  const [selectedPlatforms, setSelectedPlatforms] = useURLSync(
    searchParams,
    setSearchParams,
    "platforms",
    "array",
    []
  );

  // Select Consoles
  const [selectedNintendoConsoles, setSelectedNintendoConsoles] = useState([]);
  const [selectedSegaConsoles, setSelectedSegaConsoles] = useState([]);
  const [selectedPlayStationConsoles, setSelectedPlayStationConsoles] =
    useState([]);
  const [selectedXboxConsoles, setSelectedXboxConsoles] = useState([]);

  const [isFiltersOpen, setIsFiltersOpen] = useToggle(false);

  // Scroll to the top of the page when switching the page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  const location = useLocation();

  // Fetch the whole game data
  const { data, status } = useQuery({
    queryKey: ["games", location.search],
    queryFn: async () => {
      const response = await fetch(
        `https://api.matemine.shop/games${location.search}`
      );

      if (!response.ok) {
        throw Error("There was an error");
      }

      return response.json();
    },
  });

  return (
    <MarketPlaceContainer>
      <Wrapper>
        <FilterAndSortWrapper>
          <MobileFilterButton onClick={() => setIsFiltersOpen(true)}>
            <Filter size={24} />
          </MobileFilterButton>
          <SortWrapper>
            <GamesPerPage>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label htmlFor="per-page">Show: </label>

                <select
                  id="per-page"
                  value={perPage}
                  onChange={(event) => {
                    setPerPage(event.target.value);
                  }}
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                  <option value="76">76</option>
                </select>
              </form>
            </GamesPerPage>
            <SortBy>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label htmlFor="sort-by">Sort By: </label>

                <select
                  id="sort-by"
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                  }}
                >
                  <option value="price-desc">Price-Desc</option>
                  <option value="price-asc">Price-Asc</option>
                  <option value="alpha-desc">A-to-Z</option>
                  <option value="alpha-asc">Z-to-A</option>
                  <option value="rating-desc">Rating Desc</option>
                  <option value="rating-asc">Rating Asc</option>
                </select>
              </form>
            </SortBy>
          </SortWrapper>
        </FilterAndSortWrapper>

        <MarketPlaceWrapper>
          <FiltersWrapper>
            <Filters
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
              selectedNintendoConsoles={selectedNintendoConsoles}
              setSelectedNintendoConsoles={setSelectedNintendoConsoles}
              selectedSegaConsoles={selectedSegaConsoles}
              setSelectedSegaConsoles={setSelectedSegaConsoles}
              selectedPlayStationConsoles={selectedPlayStationConsoles}
              setSelectedPlayStationConsoles={setSelectedPlayStationConsoles}
              selectedXboxConsoles={selectedXboxConsoles}
              setSelectedXboxConsoles={setSelectedXboxConsoles}
            />
          </FiltersWrapper>
          {status === "success" && (
            <GameGrid gameList={data} perPage={perPage} page={page} />
          )}
        </MarketPlaceWrapper>
        <PaginationWrapper>
          {/* {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          )} */}
        </PaginationWrapper>
      </Wrapper>
      {isFiltersOpen && (
        <FilterDrawer handleDismiss={setIsFiltersOpen} margin={"50px"}>
          <Filters
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            selectedNintendoConsoles={selectedNintendoConsoles}
            setSelectedNintendoConsoles={setSelectedNintendoConsoles}
            selectedSegaConsoles={selectedSegaConsoles}
            setSelectedSegaConsoles={setSelectedSegaConsoles}
            selectedPlayStationConsoles={selectedPlayStationConsoles}
            setSelectedPlayStationConsoles={setSelectedPlayStationConsoles}
            selectedXboxConsoles={selectedXboxConsoles}
            setSelectedXboxConsoles={setSelectedXboxConsoles}
          />
        </FilterDrawer>
      )}
    </MarketPlaceContainer>
  );
}

const MarketPlaceContainer = styled.div`
  // border: 3px solid springgreen;
  position: relative;
`;

const Wrapper = styled.div`
  // border: 3px solid red;
  overflow: hidden;
`;

const MarketPlaceWrapper = styled.div`
  // border: 3px dashed purple;
  display: flex;

  @media (${QUERIES.tabletAndSmaller}) {
    display: revert;
  }
`;

const FilterAndSortWrapper = styled.div`
  // border: 3px solid springgreen;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 10px 0px 5px;
  gap: 25px;

  @media (${QUERIES.tabletAndSmaller}) {
    justify-content: space-between;
    gap: 15px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    gap: 5px;
  }

  @media (max-width: 375px) {
    gap: 0;
    padding: 0;
    font-size: 1.1rem;
  }
`;

const SortWrapper = styled.div`
  // border: 3px solid red;
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  flex: 1;

  @media (${QUERIES.tabletAndSmaller}) {
    gap: 15px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    gap: 5px;
  }
`;

const GamesPerPage = styled.div`
  // border: 3px dashed black;
`;

const SortBy = styled.div`
  // border: 3px solid green;
`;

const FiltersWrapper = styled.div`
  // border: 3px solid red;
  padding-top: 16px;
  flex: 1;

  @media (${QUERIES.tabletAndSmaller}) {
    display: none;
  }
`;

const MobileFilterButton = styled.div`
  display: none;
  @media (${QUERIES.tabletAndSmaller}) {
    // border: 2px solid red;
    display: revert;
    padding: 5px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default MarketPlace;
