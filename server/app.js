import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { AppError } from "./utils/appError.js"
import { globalErrorHandler } from "./middlewares/error.js"
import userRouter from "./routes/userRoute.js"
import cors from 'cors'
import { Sale } from "./models/salesModel.js"

const app=express()

app.use(cors({ origin: "*"}));

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Everything's fine"    
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is up and running"
    })
})

app.use('/api/v1',userRouter)

app.all('*',(req,res,next)=>{
    next(AppError(`cant find ${req.originalUrl} on this server`,400))
})

app.use(globalErrorHandler)

const dummyData = [];

for (let i = 0; i < 100; i++) {
    const data = {
        date: getRandomDate(),
        totalRevenue: getRandomNumber(50000, 200000),
        totalUnitsSold: getRandomNumber(2000, 10000),
        averageOrderValue: getRandomNumber(100, 500),
        topProducts: generateTopProducts(),
        salesByRegion: generateSalesByRegion(),
        averageCustomerLifetimeValue: getRandomNumber(1000, 5000),
        conversionRate: getRandomFloat(0.05, 0.3),
        salesCycleLength: getRandomNumber(10, 30),
        yearOverYearGrowth: getRandomFloat(-0.2, 0.5)
    };

    dummyData.push(data);
}

function getRandomDate() {
    const start = new Date(2022, 0, 1).getTime();
    const end = new Date().getTime();
    return new Date(start + Math.random() * (end - start));
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function generateTopProducts() {
    const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
    const topProducts = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        topProducts.push({ productName: product, unitsSold: getRandomNumber(100, 1000), revenue: getRandomNumber(5000, 20000) });
    }
    return topProducts;
}

function generateSalesByRegion() {
    const regions = ['North', 'South', 'East', 'West'];
    const salesByRegion = [];
    regions.forEach(region => {
        salesByRegion.push({ region, revenue: getRandomNumber(10000, 50000) });
    });
    return salesByRegion;
}

console.log(dummyData);

Sale.insertMany(dummyData)
  .then(() => {
    console.log('Dummy data inserted successfully!');
  })
  .catch((error) => {
    console.error('Error inserting dummy data:', error);
  });

app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL,{ dbName:'adminPanel'})
    .then(()=>console.log(`Server running successfully on http://localhost:${process.env.PORT}`))
    .catch((error)=>console.log(error))
})