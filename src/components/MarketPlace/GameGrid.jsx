import styled from "styled-components";
import { Link } from "react-router-dom";
import { QUERIES } from "../../constants";
import { useQueryClient } from "@tanstack/react-query";

export default function GameGrid({ gameList, gamesPerPage, currentPage }) {
  const queryClient = useQueryClient();
  return (
    <Grid>
      {gameList.map((game) => (
        <GameCard
          to={`/product/${game.game_id}`}
          key={game.game_id}
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: ["games", "game", "screenshots", `${game.game_id}`],
              queryFn: async () => {
                console.log(game.game_id);
                const response = await fetch(
                  `https://api.matemine.shop/games/screenshots/${game.game_id}`
                );
                if (!response.ok) {
                  throw new Error("There was an error");
                }

                return response.json();
              },
              staleTime: Infinity,
            });
          }}
        >
          <GameCoverWrapper>
            <GameCover>
              <GameCoverImage
                src={game.sample_cover_image}
                alt={`Game Cover for the game ${game.title}`}
              />
            </GameCover>
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
  grid-template-rows: repeat(3, 1fr);

  @media (${QUERIES.laptopAndSmaller}) {
    gap: 40px;
  }

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;

const GameCard = styled(Link)`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
  min-width: 0;
  color: black;
  text-decoration: none;
`;

const GameCoverWrapper = styled.div`
  // border: 3px dashed white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 100%;
`;

const GameCover = styled.div`
  // border: 3px dashed green;
  overflow: hidden;
  width: 100%;
`;

const GameCoverImage = styled.img`
  // border: 3px solid blue;
  max-width: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const GameInfo = styled.div`
  // border: 3px solid springgreen;
  text-align: center;
`;
