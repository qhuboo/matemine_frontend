import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";
import FilterDrawer from "./FilterDrawer";
import GameGrid from "./GameGrid";
import { QUERIES } from "../../constants";
import { Filter } from "react-feather";
import useToggle from "../../hooks/useToggle";

import useGetMarketPlaceGames from "../../api/apiHooks/useGetMarketPlaceGames";
import { validPerPageOptions, validSortOptions } from "../../constants";

function MarketPlace() {
  // Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    if (
      !searchParams.get("perPage") ||
      !validPerPageOptions.includes(searchParams.get("perPage"))
    ) {
      newParams["perPage"] = "12";
    }

    if (
      !searchParams.get("page") ||
      !/^[0-9]+$/.test(searchParams.get("page"))
    ) {
      newParams["page"] = "1";
    }

    if (
      !searchParams.get("sort") ||
      !validSortOptions.includes(searchParams.get("sort"))
    ) {
      newParams["sort"] = "alpha-asc";
    }

    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const location = useLocation();

  const [isFiltersOpen, setIsFiltersOpen] = useToggle(false);

  // Scroll to the top of the page when switching the page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams.get("page")]);

  const { data, status } = useGetMarketPlaceGames(location);
  function getValues(group) {
    const value = searchParams.get(group);
    return value ? value.split(",") : [];
  }

  function isChecked(group, value) {
    const values = getValues(group);
    return values.includes(value);
  }

  function handleCheckBoxChange(group, value) {
    const values = getValues(group);
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    // Create a new params object with all the current values
    const newParams = {};
    searchParams.forEach((value, key) => (newParams[key] = value));

    // Update or remove the changed group
    if (newValues.length) {
      newParams[group] = newValues.join(",");
      newParams.page = 1;
    } else {
      delete newParams[group];
    }

    setSearchParams(newParams, { replace: true });
  }

  function handleSelectChange(name, value) {
    const newParams = {};
    // Copy the current searchParams into a new object
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    if (value) {
      newParams[name] = value;
      newParams.page = 1;
    } else {
      delete newParams[name];
    }
    setSearchParams(newParams, { replace: true });
  }

  return (
    <MarketPlaceContainer>
      <Wrapper>
        <FilterAndSortWrapper>
          <MobileFilterButton onClick={() => setIsFiltersOpen(true)}>
            <Filter size={24} />
          </MobileFilterButton>
          <SortWrapper>
            <GamesPerPage>
              <label htmlFor="per-page">Show: </label>
              <select
                id="per-page"
                value={searchParams.get("perPage") || "12"}
                onChange={(event) => {
                  event.preventDefault();
                  handleSelectChange("perPage", event.target.value);
                }}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="76">76</option>
              </select>
            </GamesPerPage>
            <SortBy>
              <label htmlFor="sort-by">Sort By: </label>
              <select
                id="sort-by"
                value={searchParams.get("sort") || "alpha-asc"}
                onChange={(event) => {
                  event.preventDefault();
                  handleSelectChange("sort", event.target.value);
                }}
              >
                <option value="price-desc">Price-Desc</option>
                <option value="price-asc">Price-Asc</option>
                <option value="alpha-asc">A-to-Z</option>
                <option value="alpha-desc">Z-to-A</option>
                <option value="rating-desc">Rating Desc</option>
                <option value="rating-asc">Rating Asc</option>
              </select>
            </SortBy>
          </SortWrapper>
        </FilterAndSortWrapper>

        <MarketPlaceWrapper>
          <FiltersWrapper>
            <Filters
              isChecked={isChecked}
              handleCheckBoxChange={handleCheckBoxChange}
            />
          </FiltersWrapper>
          {status === "success" && <GameGrid gameList={data.games} />}
        </MarketPlaceWrapper>
        <PaginationWrapper>
          {status === "success" && data.totalPages > 0 && (
            <Pagination
              totalPages={data?.totalPages}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}
        </PaginationWrapper>
      </Wrapper>
      {isFiltersOpen && (
        <FilterDrawer handleDismiss={setIsFiltersOpen} margin={"50px"}>
          <Filters
            isChecked={isChecked}
            handleCheckBoxChange={handleCheckBoxChange}
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
