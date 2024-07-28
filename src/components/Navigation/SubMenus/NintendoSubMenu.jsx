import SubMenuWrapper from "./SubMenuWrapper";
import platforms from "../../../platform_data";
import styled from "styled-components";

export default function NintendoSubMenu({ $isActive }) {
  return (
    <SubMenuWrapper $isActive={$isActive}>
      <SubMenuContentWrapper>
        <LinksWrapper></LinksWrapper>
        <FeaturedWrapper></FeaturedWrapper>
      </SubMenuContentWrapper>
    </SubMenuWrapper>
  );
}

const SubMenuContentWrapper = styled.div`
  border: 3px solid red;
  display: flex;
  gap: 150px;
  height: 100%;
`;

const LinksWrapper = styled.div`
  border: 2px solid green;
  flex: 1.25;
`;

const FeaturedWrapper = styled.div`
  border: 2px solid springgreen;
  flex: 1;
`;
