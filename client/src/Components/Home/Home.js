import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,Scatter
} from "recharts";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import {Chart,ArcElement} from 'chart.js';
import {registerables } from 'chart.js';
import { Line as ChartLine} from "react-chartjs-2";

    Chart.register(ArcElement)
      Chart.register(...registerables);



function Home() {
  const [sales, setSales] = useState([]);

  // top products by revenue
  const productsData = sales.reduce((accumulator, sale) => {
    sale.topProducts.forEach((product) => {
      const existingProduct = accumulator.find(
        (item) => item.name === product.productName
      );
      if (existingProduct) {
        existingProduct.revenue += product.revenue;
      } else {
        accumulator.push({
          name: product.productName,
          revenue: product.revenue,
        });
      }
    });
    return accumulator;
  }, []);

  // total revenue over time
  const revenueData = sales
    ?.slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((sale) => ({
      name: new Date(sale.date).toLocaleDateString(),
      revenue: sale.totalRevenue,
    }));

  useEffect(() => {
    console.log("product data is", productsData);
    console.log(salesByRegion);
  }, [sales]);

  // revenue from each region
  const salesByRegion = sales.reduce((accumulator, sale) => {
    sale.salesByRegion.forEach((product) => {
      const existingProduct = accumulator.find(
        (item) => item.region === product.region
      );
      if (existingProduct) {
        existingProduct.revenue += product.revenue;
      } else {
        accumulator.push({ region: product.region, revenue: product.revenue });
      }
    });
    return accumulator;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const jwttoken = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(`${FRONTEND_URL}/sales`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
          },
        });
        console.log(response);
        setSales(response.data.sales);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // average order value over time

  const date=sales
  ?.slice()
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .map((sale)=>new Date(sale.date).toLocaleDateString())
  const averageOrderValue = sales?.map((sale) => sale.averageOrderValue);

  const chartData = {
    labels: date,
    datasets: [
      {
        label: "Average Order Value",
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        data: averageOrderValue,
      },
    ],
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.main_title}>
        <h3>DASHBOARD</h3>
      </div>
      <div className={styles.charts}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={productsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={revenueData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="region" name="region" />
            <YAxis type="number" dataKey="revenue" name="revenue" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Sales" data={salesByRegion} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">

        <ChartLine
        data={chartData}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "Average Order Value",
              },
            },
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
          },
        }}
      />
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
