import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MarketPlace() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      const response = await fetch("https://api.matemine.shop/games");
      const data = await response.json();
      setGames(data);
    }

    getGames();
  }, []);

  return (
    <GameGrid>
      {games.map((game) => (
        <GameCard to={"/product"} key={game.game_id}>
          <GameCover src={game.sample_cover_image} alt="" />
          <span>{game.title}</span>
          <h3>${game.price}</h3>
        </GameCard>
      ))}
    </GameGrid>
  );
}

const GameGrid = styled.div`
  //   border: 3px solid purple;
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

export default MarketPlace;
