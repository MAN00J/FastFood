import  mongoose from 'mongoose'

let Schema = mongoose.Schema;

let AdminLogin = new Schema({
    Username :{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    AccessLevel :{
        type:String,
        required:true
    },
    RefreshToken:{
        type:String
    }
},
{timestamps:true})

const AdminLoginModel = mongoose.model("Adminlogininfo",AdminLogin)
export default AdminLoginModel;