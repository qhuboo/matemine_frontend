import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";
import FilterDrawer from "./FilterDrawer";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlatforms, setSelectedPlatforms] = useState(initialPlatforms);
  const [selectedNintendoConsoles, setSelectedNintendoConsoles] = useState([]);
  const [selectedSegaConsoles, setSelectedSegaConsoles] = useState([]);
  const [selectedPlayStationConsoles, setSelectedPlayStationConsoles] =
    useState([]);
  const [selectedXboxConsoles, setSelectedXboxConsoles] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useToggle(false);
  console.log(isFiltersOpen);

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
  console.log(allConsoles);

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
    <div>
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
        <GameGrid>
          {games.slice(25 * currentPage, 25 * (currentPage + 1)).map((game) => (
            <GameCard to={`/product/${game.game_id}`} key={game.game_id}>
              <GameCover src={game.sample_cover_image} alt="" />
              <span>{game.title}</span>
              <h3>${game.price}</h3>
            </GameCard>
          ))}
        </GameGrid>
      </MarketPlaceWrapper>
      <PaginationWrapper>
        <Pagination
          totalPages={13}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationWrapper>
    </div>
  );
}

const MarketPlaceWrapper = styled.div`
  // border: 3px solid purple;
  display: flex;
`;
const FiltersWrapper = styled.div`
  // border: 3px solid red;
  padding-top: 16px;
  flex: 1;

  @media (${QUERIES.laptopAndSmaller}) {
    display: none;
  }
`;
const GameGrid = styled.div`
  // border: 3px solid purple;
  flex: 5;
  padding: 30px;
  gap: 75px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;

const GameCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  color: black;
  text-decoration: none;
`;

const GameCover = styled.img`
  min-width: 0;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MobileFiltersWrapper = styled.div`
  display: none;

  @media (${QUERIES.laptopAndSmaller}) {
    border: 2px solid red;
    display: revert;
  }
`;

const MobileFilterButton = styled.div`
  display: none;
  flex-grow: 0;
  flex-shrink: 0;

  @media (${QUERIES.laptopAndSmaller}) {
    display: revert;
  }
`;

export default MarketPlace;
