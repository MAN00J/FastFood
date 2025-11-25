
import SellerAccount from "../../Model/SellerAccount.model.js";
import { BcryptPassword } from "../../utils/BycriptPassword.js";
import bcrypt from 'bcryptjs';
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