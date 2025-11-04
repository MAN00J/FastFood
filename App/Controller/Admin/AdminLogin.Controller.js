import AdminLoginModel from "../../Model/AdminLogin.model.js";
import { BcryptPassword } from "../../utils/BycriptPassword.js";
import bcrypt from 'bcryptjs';
export const Adminsignup = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "No data provided" })
        }
        const { username, password, accessLevel } = req.body;
        if (!username || !password || !accessLevel) {
            return res.status(400).json({ message: "All  field are required!" })
        }
        let check = await AdminLoginModel.findOne({ Username: username })
        if (check) {
            return res.json({ message: "Username not Avaiable" });
        }
        let HashPassword = await BcryptPassword(password)

        let account = new AdminLoginModel({
            Username: username,
            Password: HashPassword,
            AccessLevel: accessLevel
        })

        await account.save();
        const { accessToken, refreshToken } = await JwtRefreshTokenAndAccessToken(account);

        account.RefreshToken = refreshToken;
        await account.save()
        const option = {
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                message: "Admin Created Successfully!",
                accessToken,
                refreshToken
            });


    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const AdminLogin = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "No data  Provided!" })
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All field  required!" })
        }
        let check = await AdminLoginModel.findOne({ username })
        if (!check) {
            return res.status(400).json({ messaage: "Invalid Username and Password" })
        }
        matchPass = await bcrypt.compare(password, check.Password);
        if (!matchPass) {
            return res.status(400).json({ messaage: "Invalid Username and Password" })
        }
        const { accessToken, refreshToken } = await JwtRefreshTokenAndAccessToken(check);
        check.RefreshToken = refreshToken;
        await check.save()
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
                refreshToken,
                check

            });


    } catch {
        return res.send(500).json({ message: "Server Error!" })
    }
}