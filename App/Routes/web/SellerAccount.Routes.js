import express from 'express'
import { ForgotSellerPasswordByEmail, SellerLogin, SellerResetPasswordVerify, SignupSeller } from '../../Controller/Web/SellerAccount.controller.js';


let SellerRoute  = express.Router();

SellerRoute.post('/SellerAccountSignUP',SignupSeller)
SellerRoute.post('/SellerAccountSignIn',SellerLogin)
SellerRoute.post('/SellerResetPassword',ForgotSellerPasswordByEmail)
SellerRoute.post('/SellerResetVerify',SellerResetPasswordVerify)
export default SellerRoute