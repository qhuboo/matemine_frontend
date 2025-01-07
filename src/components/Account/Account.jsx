import styled, { keyframes } from "styled-components";
import useGetOrders from "../../api/apiHooks/useGetOrders";
import * as Accordion from "@radix-ui/react-accordion";
import * as Avatar from "@radix-ui/react-avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import useAuth from "../Auth/hooks/useAuth";
import { QUERIES } from "../../constants";

export default function Account() {
  const user = useAuth();
  const orders = useGetOrders();
  console.log(orders?.data);

  return (
    <Wrapper>
      <ProfileWrapper>
        <Profile>
          <AvatarRoot>
            <AvatarImage src={"/images/sonic.png"} />
            <Avatar.Fallback />
          </AvatarRoot>
          <PersonalInfo>
            <Name>
              Name : {user?.user?.firstName} {user?.user?.lastName}
            </Name>
            <Email>Email : {user?.user?.email}</Email>
          </PersonalInfo>
        </Profile>
      </ProfileWrapper>
      <AccordionRoot type="multiple">
        <h1>Orders</h1>

        {orders?.data?.data &&
          orders?.data?.data.map((order) => {
            const date = new Date(order.order_date);
            const orderDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date);

            const totalPrice = order.total_price / 100;
            const formatedTotalPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice);

            return (
              <Accordion.Item key={order.order_id} value={order.order_id}>
                <Accordion.Header asChild>
                  <Trigger>
                    <OrderInfo>
                      <OrderNumber>Order #{order.order_id}</OrderNumber>
                      <OrderDate> {orderDate}</OrderDate>
                      <OrderPrice>{formatedTotalPrice}</OrderPrice>
                      <OrderStatus>{order.order_status}</OrderStatus>
                      <a href={order.receipt_url}>Receipt</a>
                    </OrderInfo>
                    <StyledChevronDownIcon />
                  </Trigger>
                </Accordion.Header>
                <AccordionContent>
                  {order.items.map((game) => {
                    return (
                      <CartItem key={`${order.order_date}-${game.game_id}`}>
                        <GameCover src={game.sample_cover_thumbnail} />
                        <GameTitle>{game.title}</GameTitle>
                        <GamePrice>
                          {game.quantity}
                          {" x "}${game.price}
                        </GamePrice>
                      </CartItem>
                    );
                  })}
                </AccordionContent>
              </Accordion.Item>
            );
          })}
      </AccordionRoot>
    </Wrapper>
  );
}

const slideDown = keyframes`
from{
  height: 0;
}
  to {
  height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
from {
  height: var(--radix-accordion-content-height)
}
  to {
  height: 0;
  }
`;

const Wrapper = styled.div`
  // border: 3px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 600;
`;

const ProfileWrapper = styled.div`
  // border: 2px solid blue;
  width: 100%;
  padding: 60px;

  @media (${QUERIES.tabletAndSmaller}) {
    padding: 0;
  }
`;

const Profile = styled.div`
  // border: 2px solid green;
  display: flex;
  gap: 30px;
  font-size: 1.3rem;

  @media (${QUERIES.tabletAndSmaller}) {
    gap: 10px;
    font-size: 1rem;
  }
`;

const AvatarRoot = styled(Avatar.Root)`
  // border: 2px solid red;
`;

const AvatarImage = styled(Avatar.Image)`
  // border: 2px solid black;
  background-color: transparent;
  width: 100px;
  height: 100px;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 75px;
    height: 75px;
  }
`;

const PersonalInfo = styled.div``;
const Name = styled.div``;
const Email = styled.div``;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  // border: 2px solid red;
  width: 26px;
  height: 26px;
  transition: transform 300ms ease;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 20px;
    height: 20px;
  }
`;

const AccordionRoot = styled(Accordion.Root)`
  // border: 2px solid springgreen;
  width: 50%;
  font-size: 1.3rem;

  @media (${QUERIES.laptopAndSmaller}) {
    width: 70%;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    width: 100%;
    font-size: 1.2rem;
  }

  @media (max-width: 650px) {
    font-size: 1rem;
  }
`;

const Trigger = styled(Accordion.Trigger)`
  // border: 2px solid blue;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionContent = styled(Accordion.Content)`
  border: 1px solid black;
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const OrderInfo = styled.div`
  // border: 2px solid blue;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 70%;

  @media (${QUERIES.mobileAndSmaller}) {
    width: revert;
    justify-content: revert;
    gap: 5px;
  }
`;

const OrderNumber = styled.div`
  @media (${QUERIES.mobileAndSmaller}) {
    display: none;
  }
`;

const OrderDate = styled.div``;

const OrderPrice = styled.div``;

const OrderStatus = styled.div``;

const CartItem = styled.div`
  // border: 2px solid springgreen;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameCover = styled.img`
  width: 100px;
`;

const GameTitle = styled.div``;

const GamePrice = styled.div``;
