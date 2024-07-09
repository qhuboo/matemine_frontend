import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GameGrid({ gameList, gamesPerPage, currentPage }) {
  return (
    <Grid>
      {gameList
        .slice(gamesPerPage * currentPage, gamesPerPage * (currentPage + 1))
        .map((game) => (
          <GameCard to={`/product/${game.game_id}`} key={game.game_id}>
            <GameCoverWrapper>
              <GameCover src={game.sample_cover_image} alt="" />
            </GameCoverWrapper>

            <GameInfo>
              <span>{game.title}</span>
              <h3>${game.price}</h3>
            </GameInfo>
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
  // border: 3px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
  min-width: 0;
  color: black;
  text-decoration: none;
`;

const GameCoverWrapper = styled.div`
  // border: 3px dashed black;
  flex: 1;
  background-color: black;
  display: grid;
  place-content: center;
`;

const GameCover = styled.img`
  // border: 3px solid blue;
  min-width: 0;
`;

const GameInfo = styled.div`
  // border: 3px solid springgreen;
`;
