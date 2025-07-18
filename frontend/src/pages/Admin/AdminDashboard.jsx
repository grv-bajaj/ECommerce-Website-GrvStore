import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice.js";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice.js";
import AdminMenu from "./AdminMenu.jsx";
import OrderList from "./OrderList.jsx";
import Loader from "../../components/Loader.jsx";
import { formatToIST } from "../../utils/dateHelpers.js";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
  options: {
    chart: {
      type: "line",
      foreColor: "#ffffff",
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#ffffff"],
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Sales Trend",
      align: "left",
      style: {
        color: "#ffffff",
      },
    },
    grid: {
      borderColor: "#444",
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [],
      title: {
        text: "Date",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      title: {
        text: "Sales  (Only Paid Orders)",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
      min: 0,
    },
    legend: {
      labels: {
        colors: "#ffffff",
      },
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  },
  series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      // Format sales data for the chart
      const formattedSalesDate = salesDetail.map((item) => ({
        x: formatToIST(item._id, false),
        y: item.totalSales,
      }));

      setState((prevState) => ({
        // Keep the previous state
        ...prevState,
        // Update the options and series with new data
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        // Update the series with the formatted sales data
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />
      <section className="">
        <div className="w-[80%] xl:ml-[4rem] md:ml-[0rem] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-blue-400 text-center p-3">
              ₹
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              ₹ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-blue-400 text-center p-3">
              ₹
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-blue-400 text-center p-3">
              ₹
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>
        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;