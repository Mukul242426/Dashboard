import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
    date: Date,
    totalRevenue: Number,
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
    conversionRate: Number,
    yearOverYearGrowth: Number
});

export const Sale=mongoose.model('Sale',salesSchema);