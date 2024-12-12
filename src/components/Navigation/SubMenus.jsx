import styled, { keyframes, css } from "styled-components";
import { QUERIES } from "../../constants.js";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import platforms from "../../platform_data.js";
import { favorites } from "../../data.js";
import { fetchWrapper } from "../../utils.js";

export default function SubMenus({
  activeMenu,
  setIsSubMenuOpen,
  setActiveMenu,
}) {
  const queryClient = useQueryClient();

  let games = [];
  if (activeMenu !== "") {
    games = platforms[activeMenu];
  } else {
    return;
  }

  return (
    <SubMenuWrapper $isActive={activeMenu !== ""}>
      <SubMenuContentWrapper $isActive={activeMenu !== ""} key={activeMenu}>
        <LinksWrapper>
          <SubSectionWrapper $isActive={activeMenu !== ""} $animationDelay={50}>
            <SubSectionTitle>Consoles</SubSectionTitle>
            <SubSectionItemsWrapper>
              {games.map((console) => (
                <SubSectionItem
                  key={console}
                  to={{
                    pathname: "/marketplace",
                    search: `?perPage=12&page=1&sort=rating-desc&${activeMenu}=${console}`,
                  }}
                  onMouseEnter={() => {
                    queryClient.prefetchQuery({
                      queryKey: [
                        "games",
                        `?perPage=12&page=1&sort=rating-desc&${activeMenu}=${console}`,
                      ],
                      queryFn: fetchWrapper.get(
                        `${
                          import.meta.env.VITE_BACKEND_URL
                        }/games?perPage=12&page=1&sort=rating-desc&${activeMenu}=${console}`
                      ),
                    });
                  }}
                  onClick={() => {
                    setActiveMenu("");
                    setIsSubMenuOpen(false);
                  }}
                >
                  {console}
                </SubSectionItem>
              ))}
            </SubSectionItemsWrapper>
          </SubSectionWrapper>
          <SubSectionWrapper
            $isActive={activeMenu !== ""}
            $animationDelay={100}
          >
            <SubSectionTitle>Top Picks</SubSectionTitle>
            <SubSectionItemsWrapper>
              {favorites[activeMenu].map((game) => (
                <SubSectionItem
                  key={game.title}
                  onClick={() => {
                    setActiveMenu("");
                    setIsSubMenuOpen(false);
                  }}
                  to={`/product/${game.game_id}`}
                  onMouseEnter={() => {
                    queryClient.prefetchQuery({
                      queryKey: [
                        "games",
                        "game",
                        "screenshots",
                        `${game.game_id}`,
                      ],
                      queryFn: fetchWrapper.get(
                        `${
                          import.meta.env.VITE_BACKEND_URL
                        }/games/screenshots/${game.game_id}`
                      ),
                    });
                  }}
                >
                  {game.title}
                </SubSectionItem>
              ))}
            </SubSectionItemsWrapper>
          </SubSectionWrapper>
        </LinksWrapper>
        <FeaturedWrapper>
          <FeaturedTitle>Featured</FeaturedTitle>
          <FeaturedGames>
            {favorites[activeMenu].slice(0, 3).map((game) => {
              return (
                <FeaturedGameCard key={game.title}>
                  <FeaturedGameImageWrapper>
                    <GameImageWrapper
                      onClick={() => {
                        setActiveMenu("");
                        setIsSubMenuOpen(false);
                      }}
                      to={`/product/${game.game_id}`}
                    >
                      <FeaturedGameImage
                        src={game.sample_cover.image}
                        alt="hello"
                      />
                    </GameImageWrapper>
                  </FeaturedGameImageWrapper>
                  <FeaturedGameTitleWrapper>
                    <SubSectionItem
                      key={game.title}
                      onClick={() => {
                        setActiveMenu("");
                        setIsSubMenuOpen(false);
                      }}
                      to={`product/${game.game_id}`}
                      onMouseEnter={() => {
                        queryClient.prefetchQuery({
                          queryKey: [
                            "games",
                            "game",
                            "screenshots",
                            `${game.game_id}`,
                          ],
                          queryFn: fetchWrapper.get(
                            `${
                              import.meta.env.VITE_BACKEND_URL
                            }/games/screenshots/${game.game_id}`
                          ),
                        });
                      }}
                    >
                      {game.title}
                    </SubSectionItem>
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

const SubMenuWrapper = styled.div`
  border-bottom: 2px solid black;
  // border: 3px solid red;
  width: 100%;
  position: absolute;
  top: var(--navigation-bar-height);
  background: var(--background-color);
  clip-path: ${(props) =>
    props.$isActive ? "inset(0%)" : "inset(0% 0% 100% 0%)"};
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: clip-path 800ms cubic-bezier(1, -0.01, 0, 1), opacity 100ms ease;
`;

const SubMenuContentWrapper = styled.div`
  // border: 3px solid red;
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

const SubSectionItem = styled(Link)`
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  display: block;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.3rem;
  }

  &:hover {
    text-decoration: underline;
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
  // border: 2px solid purple;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

const FeaturedGameCard = styled.div`
  // border: 2px solid red;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
`;

const FeaturedGameImageWrapper = styled.div`
  // border: 3px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 50%;
  min-width: 0;
  flex: 1;
`;

const GameImageWrapper = styled(Link)`
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
  // border: 3px solid green;
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
