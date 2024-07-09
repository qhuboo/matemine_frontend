import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GameGrid({ gameList, gamesPerPage, currentPage }) {
  return (
    <Grid>
      {gameList
        .slice(gamesPerPage * currentPage, gamesPerPage * (currentPage + 1))
        .map((game) => (
          <GameCard to={`/product/${game.game_id}`} key={game.game_id}>
            <GameCover src={game.sample_cover_image} alt="" />
            <span>{game.title}</span>
            <h3>${game.price}</h3>
          </GameCard>
        ))}
    </Grid>
  );
}

const Grid = styled.div`
  // border: 3px dotted springgreen;
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
