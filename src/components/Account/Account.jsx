import useGetOrders from "../../api/apiHooks/useGetOrders";

export default function Account() {
  const orders = useGetOrders();
  console.log(orders?.data?.data);

  return (
    <div>
      {orders?.data?.data &&
        orders?.data?.data.map((order) => {
          return (
            <a key={order.order_id} href={`${order.receipt_url}`}>
              Receipt
            </a>
          );
        })}
    </div>
  );
}
