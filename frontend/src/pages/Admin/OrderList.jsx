import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { formatToIST } from "../../utils/dateHelpers";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <div className="container mx-auto ml-[5rem] mt-[1rem]">
      <h2 className="text-3xl mb-4 font-bold">Manage Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />
          <thead className="w-full">
            <tr className="mb-[5rem] font-bold text-lg border-b-2">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATE & TIME</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>
                <td>{order.user ? order.user.username : "N/A"}</td>
                <td>{order.createdAt ? formatToIST(order.createdAt) : "N/A"}</td>
                <td>₹ {order.totalPrice}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-bold cursor-pointer py-2 px-3 rounded-lg">
                      More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default OrderList;