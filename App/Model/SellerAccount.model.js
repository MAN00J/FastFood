
import mongoose from 'mongoose';

let Schema = mongoose.Schema

const SellerModel = new Schema({
     UserId:{
        type:Number,
        required:true,
        unique:true
    },
    CompanyName: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique : true
    },
    Phone: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    RefreshToken:{
        type:String
    },
    Status:{
        type:String
    }
})

const SellerAccount = mongoose.model('SellerAccountInfo', SellerModel)
export default SellerAccount;