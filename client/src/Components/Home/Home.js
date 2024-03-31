import React, { useState ,useEffect} from 'react'
import styles from './Home.module.css'
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios'
import {FRONTEND_URL} from '../../utils/utils'

function Home() {

  const [sales,setSales]=useState([]);


// top products by revenue
  const productsData = sales.reduce((accumulator, sale) => {
    sale.topProducts.forEach((product) => {
        const existingProduct = accumulator.find((item) => item.name === product.productName);
        if (existingProduct) {
            existingProduct.revenue += product.revenue;
        } else {
            accumulator.push({ name: product.productName, revenue: product.revenue });
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
    revenue: sale.totalRevenue
  }));

  useEffect(()=>{
    console.log("product data is",productsData)
  },[sales])


  useEffect(()=>{
    const getData=async()=>{

      const jwttoken=JSON.parse(localStorage.getItem('token'))

      try{

        const response=await axios.get(`${FRONTEND_URL}/sales`,{
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${jwttoken}`
          }
        })
        console.log(response)
        setSales(response.data.sales)

      }catch(error){
        console.log(error)
      }

    }
    getData()
  },[])
     

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
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
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
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home