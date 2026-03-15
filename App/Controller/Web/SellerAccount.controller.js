
import SellerAccount from "../../Model/SellerAccount.model.js";
import { BcryptPassword } from "../../utils/BycriptPassword.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { JwtRefreshTokenAndAccessToken } from "../../utils/jwtRefreshTokenAndAccessToken.js";
export const SignupSeller = async (req, res) => {
    try {
        if (!req.body) return res.status(401).json({ message: "No data provided." })
        const { name, email, phone, address, password } = req.body;
        if (!name || !email || !phone || !address || !password) {
            return res.status(401).json({ message: "All field required." })
        }
        const exist = await SellerAccount.findOne({ Email: email.toLowerCase() });


        if (exist) return res.json({ message: "User already exist!" });

        const HashPassword = await BcryptPassword(password)
        const userId = Number(
            Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000)
        )

        const CreateAccount = new SellerAccount({
            UserId: userId,
            CompanyName: name,
            Phone: phone,
            Email:email.toLowerCase(),
            Address: address,
            Password: HashPassword,
            Status :"Unvarified"
        })
        await CreateAccount.save()
        const { accessToken, refreshToken } = await JwtRefreshTokenAndAccessToken(CreateAccount);

        CreateAccount.RefreshToken = refreshToken;
        await CreateAccount.save()
        const option = {
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                message: "User Created Successfully!",
                accessToken,
                refreshToken
            });

    } catch (err) {
        res.status(500).json({ message: "Server Internal Error",err })
    }

}


export const SellerLogin = async (req, res) => {
    try {
        if (!req.body) return res.status(401).json({ message: "No Data Provided" })
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Username not provided!" })
        }
        let user = await SellerAccount.findOne({ Email: email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Username and Password." })
        }
        
        const match_pass = await bcrypt.compare(password, user.Password)
        if (!match_pass) {
            return res.status(401).json({ message: "Invalid Username and Password." })
        } 
        const { accessToken, refreshToken } = await JwtRefreshTokenAndAccessToken(user);
         user.RefreshToken = refreshToken;
        await user.save()
        const option = {
            httpOnly: true,
            secure: false
        }
        
        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                message: "Logged In",
                accessToken,
                refreshToken
            });

        
    } catch (err) {
          return res.status(500).json({ message: "Server Internal Error" ,err});
    }
}

export const LogoutSellerAccount = async(req,res)=>{
    try{
        if(!req.body){
            return res.status(401).json({message:"No data provided !"})
        }
        const{userId}=req.body;
        if(!userId){
            return res.status(401).json({message:"please provide user Id "})

        }
        const userFind = await SellerAccount.findOne({userId})
        if(!userFind){
            return res.status(401).json({message:"UserId is not registered"})
        } 
        userFind.RefreshToken =""
        await userFind.save()
        return res.status(200).clearCookie('refreshToken').clearCookie('accessToken').json({message:"logout sucessfully."})
    }catch{

    }
}
export const ForgotSellerPasswordByEmail = async(req,res)=>{
    try{
        if(!req.body){
            return res.status(401).json({message:"No data Provided!"})
        }
        const {UEmail}=req.body;
        if(!UEmail){
            return res.json({message:"Data not provided!"})

        }
        const FindUser = await SellerAccount.findOne({ Email: UEmail })
        if(!FindUser){
            return res.json({message:"User not found!"})
        }
        const resetToken = crypto.randomBytes(32).toString("hex") 
        
        SellerAccount.createPasswordToken = crypto.createHash(process.env.resethash).update(resetToken)
        SellerAccount.resetTokenExpires = Date.now() +3600000;

        const telepoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.dotenv.nodeemail,
                pass: process.dotenv.nodepassword// NOT your Gmail password
            }
        });

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            text: `Click this link to reset your password: ${resetUrl}`
        })
        
    }catch(err){
        return res.status(500).json({message:"Internal  Server Error!"})
    }
} 
export const SellerResetPasswordVerify = async (req, res) => {
   
    const hashedToken = crypto.createHash(process.env.resetHash).update(req.params.token).digest('hex');

    try {
        const user = await SellerAccount.findOne({
            createPasswordToken: hashedToken,
            resetTokenExpires: { $gt: Date.now() } 
        });

        if (!user) return res.status(400).send("Token is invalid or has expired");

        
        user.Password = req.body.password; 
        user. createPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



