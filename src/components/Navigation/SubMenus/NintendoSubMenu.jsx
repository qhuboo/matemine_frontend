import SubMenuWrapper from "./SubMenuWrapper";
import platforms from "../../../platform_data";
import styled, { keyframes, css } from "styled-components";
import { nintendoFavorites } from "../../../data";
import { QUERIES } from "../../../constants.js";

export default function NintendoSubMenu({ $isActive }) {
  return (
    <SubMenuWrapper $isActive={$isActive}>
      <SubMenuContentWrapper $isActive={$isActive}>
        <LinksWrapper $isActive={$isActive}>
          <SubSectionWrapper $isActive={$isActive} $animationDelay={50}>
            <SubSectionTitle>Consoles</SubSectionTitle>
            <SubSectionItemsWrapper>
              {platforms.nintendo.map((console) => (
                <SubSectionItem key={console}>{console}</SubSectionItem>
              ))}
            </SubSectionItemsWrapper>
          </SubSectionWrapper>
          <SubSectionWrapper $isActive={$isActive} $animationDelay={100}>
            <SubSectionTitle>Top Picks</SubSectionTitle>
            <SubSectionItemsWrapper>
              {nintendoFavorites.map((game) => (
                <SubSectionItem key={game.title}>{game.title}</SubSectionItem>
              ))}
            </SubSectionItemsWrapper>
          </SubSectionWrapper>
        </LinksWrapper>
        <FeaturedWrapper>
          <FeaturedTitle>Featured</FeaturedTitle>
          <FeaturedGames>
            {nintendoFavorites.slice(0, 3).map((game) => {
              return (
                <FeaturedGameCard key={game.title}>
                  <FeaturedGameImageWrapper>
                    <GameImageWrapper>
                      <FeaturedGameImage
                        src={game.sample_cover.image}
                        alt="hello"
                      />
                    </GameImageWrapper>
                  </FeaturedGameImageWrapper>
                  <FeaturedGameTitleWrapper>
                    {game.title}
                  </FeaturedGameTitleWrapper>
                </FeaturedGameCard>
              );
            })}
          </FeaturedGames>
        </FeaturedWrapper>
      </SubMenuContentWrapper>
    </SubMenuWrapper>
  );
}
const slideIn = keyframes`
from {
    transform: translateY(100%);
    }
`;

const SubMenuContentWrapper = styled.div`
  //   border: 3px solid red;
  display: flex;
  gap: 50px;
  height: 100%;
  ${(props) =>
    props.$isActive
      ? css`
          animation: ${slideIn} 1000ms both cubic-bezier(0.87, 0, 0.13, 1);
        `
      : css`
          transform: translateY(100%);
        `}

  @media(${QUERIES.laptopAndSmaller}) {
    gap: 0px;
  }
`;

const LinksWrapper = styled.div`
  //   border: 2px solid green;
  display: flex;
  gap: 30px;
  padding: 20px;
`;

const SubSectionWrapper = styled.div`
  //   border: 3px solid red;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${(props) =>
    props.$isActive
      ? css`
          animation: ${slideIn} 1000ms both cubic-bezier(0.87, 0, 0.13, 1);
          animation-delay: ${props.$animationDelay}ms;
        `
      : css`
          transform: translateY(100%);
        `}
`;

const SubSectionTitle = styled.div`
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.5rem;
  }
`;

const SubSectionItemsWrapper = styled.div`
  //   border: 2px solid green;
`;

const SubSectionItem = styled.div`
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.3rem;
  }
`;

const FeaturedWrapper = styled.div`
  //   border: 2px solid springgreen;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FeaturedTitle = styled(SubSectionTitle)``;

const FeaturedGames = styled.div`
  //   border: 2px solid purple;
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const FeaturedGameCard = styled.div`
  //   border: 2px solid red;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FeaturedGameImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 50%;
  min-width: 0;
  flex: 1;
`;

const GameImageWrapper = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
`;

const FeaturedGameImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const FeaturedGameTitleWrapper = styled.div`
  //   border: 3px solid green;
  flex: 1;
  text-align: center;
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.3rem;
  }
`;
