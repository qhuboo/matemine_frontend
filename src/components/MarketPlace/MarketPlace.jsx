import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";
import FilterDrawer from "./FilterDrawer";
import GameGrid from "./GameGrid";
import { QUERIES } from "../../constants";
import { Filter } from "react-feather";
import useToggle from "../../hooks/use-toggle";

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
  const [gamesPerPage, setGamesPerPage] = useState(14);
  const totalPages = Math.ceil(games.length / gamesPerPage);

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
  }, [searchParams]);

  // Update the URL search params when the selectedPlatforms state variable changes
  useEffect(() => {
    const newSelectedPlatforms = [];
    for (const [key, value] of Object.entries(selectedPlatforms)) {
      if (value) {
        newSelectedPlatforms.push(key);
      }
    }

    setSearchParams({ platforms: newSelectedPlatforms.join(",") });
  }, [selectedPlatforms]);

  return (
    <Wrapper $isFiltersOpen={isFiltersOpen}>
      <MobileFilterButton onClick={() => setIsFiltersOpen(true)}>
        <Filter />
      </MobileFilterButton>

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
const FiltersWrapper = styled.div`
  // border: 3px solid red;
  padding-top: 16px;
  flex: 1;

  @media (${QUERIES.tabletAndSmaller}) {
    display: none;
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

const MobileFilterButton = styled.div`
  display: none;
  @media (${QUERIES.tabletAndSmaller}) {
    display: revert;
  }
`;

export default MarketPlace;
