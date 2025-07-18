import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { formatToIST } from "../../utils/dateHelpers";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="container mx-auto ml-[6rem] mt-[1rem]">
      <h2 className="text-3xl mb-4 font-bold">MY <span className="text-red-600">ORDERS</span></h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="font-bold text-lg border-b-2">
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE & TIME</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] my-3"
                />
                <td className="py-2">{order._id}</td>
                <td className="py-2">{formatToIST(order.createdAt)}</td>
                <td className="py-2">₹ {order.totalPrice}</td>
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
                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-bold cursor-pointer py-2 px-3 rounded-lg">
                      View Details
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
export default UserOrder;