import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";
import FilterDrawer from "./FilterDrawer";
import GameGrid from "./GameGrid";
import { QUERIES } from "../../constants";
import { Filter } from "react-feather";
import useToggle from "../../hooks/use-toggle";
import platforms from "../../platform_data";

const initialPlatforms = {
  nintendo: false,
  sega: false,
  playstation: false,
  xbox: false,
};

function MarketPlace() {
  const [games, setGames] = useState([]);

  // Page State
  const [currentPage, setCurrentPage] = useState(0);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const totalPages = Math.ceil(games.length / gamesPerPage);

  // Sortby
  const [sortBy, setSortBy] = useState("alpha-desc");

  // Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  // Select Platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState(initialPlatforms);

  // Select Consoles
  const [selectedNintendoConsoles, setSelectedNintendoConsoles] = useState([]);
  const [selectedSegaConsoles, setSelectedSegaConsoles] = useState([]);
  const [selectedPlayStationConsoles, setSelectedPlayStationConsoles] =
    useState([]);
  const [selectedXboxConsoles, setSelectedXboxConsoles] = useState([]);

  // Other state
  const [isFiltersOpen, setIsFiltersOpen] = useToggle(false);

  // Fetch the whole game data
  useEffect(() => {
    async function getGames() {
      const response = await fetch("https://api.matemine.shop/games");
      const data = await response.json();
      setGames(data);
    }

    getGames();
  }, []);

  // Update the selectedPlatforms state variable when the URL search params change
  useEffect(() => {
    const platforms = searchParams.get("platforms");
    if (platforms) {
      const nextSelectedPlatforms = { ...initialPlatforms };
      platforms.split(",").forEach((platform) => {
        if (
          Object.prototype.hasOwnProperty.call(nextSelectedPlatforms, platform)
        ) {
          nextSelectedPlatforms[platform] = true;
        }
      });
      setSelectedPlatforms(nextSelectedPlatforms);
    }
  }, []);

  // Update the URL search params when the selectedPlatforms state variable changes
  useEffect(() => {
    const newSelectedPlatforms = [];
    for (const [key, value] of Object.entries(selectedPlatforms)) {
      if (value) {
        newSelectedPlatforms.push(key);
      }
    }
    if (newSelectedPlatforms.length > 0) {
      searchParams.set("platforms", newSelectedPlatforms.join(","));
    } else {
      searchParams.delete("platforms");
    }

    setSearchParams(searchParams);
  }, [selectedPlatforms]);

  // Update the console state variables when the URL search params change
  useEffect(() => {
    const base64Consoles = searchParams.get("consoles");
    if (base64Consoles) {
      // Decode the base64 version of the console string and turn it into an array
      const consoles = atob(base64Consoles).split(",");

      const nextSelectedNintendoConsoles = [];
      const nextSelectedSegaConsoles = [];
      const nextSelectedPlayStationConsoles = [];
      const nextSelectedXboxConsoles = [];

      // Go through the array an populate each platform console variable with the selected consoles
      consoles.forEach((currentConsole) => {
        if (platforms.nintendo.includes(currentConsole)) {
          if (!selectedNintendoConsoles.includes(currentConsole)) {
            nextSelectedNintendoConsoles.push(currentConsole);
          }
        }

        if (platforms.sega.includes(currentConsole)) {
          if (!selectedSegaConsoles.includes(currentConsole)) {
            nextSelectedSegaConsoles.push(currentConsole);
          }
        }

        if (platforms.playstation.includes(currentConsole)) {
          if (!selectedPlayStationConsoles.includes(currentConsole)) {
            nextSelectedPlayStationConsoles.push(currentConsole);
          }
        }

        if (platforms.xbox.includes(currentConsole)) {
          if (!selectedXboxConsoles.includes(currentConsole)) {
            nextSelectedXboxConsoles.push(currentConsole);
          }
        }

        setSelectedNintendoConsoles(nextSelectedNintendoConsoles);
        setSelectedSegaConsoles(nextSelectedSegaConsoles);
        setSelectedPlayStationConsoles(nextSelectedPlayStationConsoles);
        setSelectedXboxConsoles(nextSelectedXboxConsoles);
      });
    }
  }, []);

  // Update the URL search params when the various selected consoles state variables change or the selectedPlatforms state changes
  useEffect(() => {
    // Combine all the consoles if the platform is selected
    let allConsoles = [];
    if (selectedPlatforms.nintendo) {
      allConsoles = [...allConsoles, ...selectedNintendoConsoles];
    }
    if (selectedPlatforms.sega) {
      allConsoles = [...allConsoles, ...selectedSegaConsoles];
    }
    if (selectedPlatforms.playstation) {
      allConsoles = [...allConsoles, ...selectedPlayStationConsoles];
    }
    if (selectedPlatforms.xbox) {
      allConsoles = [...allConsoles, ...selectedXboxConsoles];
    }

    if (allConsoles.length > 0) {
      const base64Consoles = btoa(allConsoles.join(","));

      searchParams.set("consoles", base64Consoles);
    } else {
      searchParams.delete("consoles");
    }
    setSearchParams(searchParams);
  }, [
    selectedNintendoConsoles,
    selectedSegaConsoles,
    selectedPlayStationConsoles,
    selectedXboxConsoles,
    selectedPlatforms,
  ]);

  // Scroll to the top of the page when switching the page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Wrapper $isFiltersOpen={isFiltersOpen}>
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
              <label htmlFor="games-per-page">Show: </label>

              <select
                id="games-per-page"
                value={gamesPerPage}
                onChange={(event) => {
                  setGamesPerPage(event.target.value);
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
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
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
        {isFiltersOpen && (
          <MobileFiltersWrapper>
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
          </MobileFiltersWrapper>
        )}
        <GameGrid
          gameList={games}
          gamesPerPage={gamesPerPage}
          currentPage={currentPage}
        />
      </MarketPlaceWrapper>
      <PaginationWrapper>
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </PaginationWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: ${(props) => (props.$isFiltersOpen ? "fixed" : "static")};
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

const MobileFiltersWrapper = styled.div`
  display: none;
  position: absolute;

  @media (${QUERIES.tabletAndSmaller}) {
    // border: 2px solid red;
    display: revert;
  }
`;

export default MarketPlace;
