import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Filters from "./Filters";

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

  const platforms = searchParams.get("platform");
  if (platforms) {
    platforms.split(",").forEach((platform) => {
      if (Object.prototype.hasOwnProperty.call(initialPlatforms, platform)) {
        initialPlatforms[platform] = true;
      }
    });
  }

  const [selectedPlatforms, setSelectedPlatforms] = useState(initialPlatforms);

  useEffect(() => {
    const array = [];
    for (const [key, value] of Object.entries(selectedPlatforms)) {
      if (value) {
        array.push(key);
      }
    }
    setSearchParams({ platforms: array.join(",") });
  }, [selectedPlatforms, setSearchParams]);

  useEffect(() => {
    async function getGames() {
      const response = await fetch("https://api.matemine.shop/games");
      const data = await response.json();
      setGames(data);
    }

    getGames();
  }, []);

  return (
    <div>
      <MarketPlaceWrapper>
        <FiltersWrapper>
          <Filters
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            setSearchParams={setSearchParams}
          />
        </FiltersWrapper>
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

export default MarketPlace;
