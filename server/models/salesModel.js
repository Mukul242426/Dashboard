import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
    date: Date,
    totalRevenue: Number,
    totalUnitsSold: Number,
    averageOrderValue: Number,
    topProducts: [{
        productName: String,
        unitsSold: Number,
        revenue: Number
    }],
    salesByRegion: [{
        region: String,
        revenue: Number
    }],
    averageCustomerLifetimeValue: Number,
    conversionRate: Number,
    salesCycleLength: Number,
    yearOverYearGrowth: Number
});

export const Sale=mongoose.model('Sale',salesSchema);