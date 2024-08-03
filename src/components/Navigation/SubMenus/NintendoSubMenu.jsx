import SubMenuWrapper from "./SubMenuWrapper";
import platforms from "../../../platform_data";
import styled, { keyframes, css } from "styled-components";
import { nintendoFavorites } from "../../../data";

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
                <FeaturedGameWrapper key={game.title}>
                  <FeaturedGame src={game.sample_cover.image} alt="hello" />
                </FeaturedGameWrapper>
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
  border: 3px solid red;
  display: flex;
  gap: 150px;
  height: 100%;
  ${(props) =>
    props.$isActive
      ? css`
          animation: ${slideIn} 1000ms both cubic-bezier(0.87, 0, 0.13, 1);
        `
      : css`
          transform: translateY(100%);
        `}
`;

const LinksWrapper = styled.div`
  border: 2px solid green;
  display: flex;
  gap: 30px;
  padding: 20px;
`;

const SubSectionWrapper = styled.div`
  border: 3px solid red;
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
`;

const SubSectionItemsWrapper = styled.div`
  border: 2px solid green;
`;

const SubSectionItem = styled.div`
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
`;

const FeaturedWrapper = styled.div`
  border: 2px solid springgreen;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FeaturedTitle = styled(SubSectionTitle)``;

const FeaturedGames = styled.div`
  display: flex;
  gap: 15px;
`;

const FeaturedGameWrapper = styled.div`
  border: 2px dotted red;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const FeaturedGame = styled.img`
  flex: 1;
  flex-shrink: 0;
  min-width: 0;
  object-fit: contain;
`;
