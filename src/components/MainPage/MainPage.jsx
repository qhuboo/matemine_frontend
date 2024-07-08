import styled from "styled-components";
import { QUERIES } from "../../constants";
import {
  nintendoFavorites,
  segaFavorites,
  playstationFavorites,
  xboxFavorites,
} from "../../data";

function MainPage() {
  return (
    <MainContent>
      <HeroImage>
        <img src="/images/donkey_kong_64_hero.jpg" alt="" />
      </HeroImage>

      <GameGridWrapper>
        <GridTitle>Nintendo 64</GridTitle>
        <GameGrid>
          {nintendoFavorites.map((game) => {
            return (
              <GameCard key={game.game_id}>
                <Image>
                  <img src={game.sample_cover.thumbnail_image} alt="" />
                </Image>
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>${game.price}</GamePrice>
                </GameInfo>
              </GameCard>
            );
          })}
        </GameGrid>
      </GameGridWrapper>
      <GameGridWrapper>
        <GridTitle>Sega</GridTitle>
        <GameGrid>
          {segaFavorites.map((game) => {
            return (
              <GameCard key={game.game_id}>
                <Image>
                  <img src={game.sample_cover.thumbnail_image} alt="" />
                </Image>
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>${game.price}</GamePrice>
                </GameInfo>
              </GameCard>
            );
          })}
        </GameGrid>
      </GameGridWrapper>
      <GameGridWrapper>
        <GridTitle>Playstation</GridTitle>
        <GameGrid>
          {playstationFavorites.map((game) => {
            return (
              <GameCard key={game.game_id}>
                <Image>
                  <img src={game.sample_cover.thumbnail_image} alt="" />
                </Image>
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>${game.price}</GamePrice>
                </GameInfo>
              </GameCard>
            );
          })}
        </GameGrid>
      </GameGridWrapper>
      <GameGridWrapper>
        <GridTitle>Xbox</GridTitle>
        <GameGrid>
          {xboxFavorites.map((game) => {
            return (
              <GameCard key={game.game_id}>
                <Image>
                  <img src={game.sample_cover.thumbnail_image} alt="" />
                </Image>
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>${game.price}</GamePrice>
                </GameInfo>
              </GameCard>
            );
          })}
        </GameGrid>
      </GameGridWrapper>
    </MainContent>
  );
}

const MainContent = styled.div`
  // border: 2px solid springgreen;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;

  @media (${QUERIES.laptopAndSmaller}) {
    gap: 75px;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    gap: 50px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    gap: 25px;
  }
`;

const HeroImage = styled.div`
  border: 1px solid black;
  max-width: 1920px;
  align-self: center;
`;

const GameGridWrapper = styled.div`
  margin-left: calc(-1 * var(--content-padding) - 1px);
  margin-right: calc(-1 * var(--content-padding) - 2px);
`;

const GridTitle = styled.h2`
  // border: 2px solid chartreuse;
  font-size: 5rem;
  line-height: 1;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 4rem;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    font-size: 3rem;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 2rem;
  }
`;

const GameGrid = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  white-space: nowrap;
`;

const GameCard = styled.div`
  border-right: 1px solid black;
  // border: 2px solid purple;
  padding: 30px;
  max-width: 600px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  gap: 50px;

  @media (${QUERIES.laptopAndSmaller}) {
    max-width: 400px;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    max-width: 400px;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    max-width: 300px;
  }
`;

const Image = styled.div`
  border: 1px solid black;
  width: fit-content;
`;

const GameInfo = styled.article`
  // border: 2px solid red;
  overflow: hidden;
`;

const GameTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  white-space: normal;
  overflow-wrap: break-word;

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1.5rem;
  }
`;
const GamePrice = styled.h3``;

export default MainPage;
