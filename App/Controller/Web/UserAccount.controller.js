import bcrypt from 'bcryptjs';
import UserAccount from "../../Model/UserAccount.model.js";
import { BcryptPassword } from "../../utils/BycriptPassword.js";
import { JwtRefreshTokenAndAccessToken } from "../../utils/jwtRefreshTokenAndAccessToken.js";
export const SignupUser = async (req, res) => {
    try {
        if (!req.body) return res.status(401).json({ message: "No data provided." })
        const { name, email, phone, address, password } = req.body;
        if (!name || !email || !phone || !address || !password) {
            return res.status(401).json({ message: "All field required." })
        }
        const exist = await UserAccount.findOne({ Email: email.toLowerCase() });


        if (exist) return res.json({ message: "User already exist!" });

        const HashPassword = await BcryptPassword(password)
        const userId = Number(
            Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000)
        )

        const CreateAccount = new UserAccount({
            UserId: userId,
            Name: name,
            Phone: phone,
            Email: email.toLowerCase(),
            Address: address,
            Password: HashPassword
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


export const UserLogin = async (req, res) => {
    try {
        if (!req.body) return res.status(401).json({ message: "No Data Provided" })
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Username not provided!" })
        }
        let user = await UserAccount.findOne({ Email: email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Username and Password." })
        }

        const match_pass= await bcrypt.compare(password, user.Password)
        
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
        console.log(accessToken,refreshToken)
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
          return res.status(500).json({ message: "Server Internal Error",err });
    }
}

