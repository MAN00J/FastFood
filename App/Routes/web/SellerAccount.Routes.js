import express from 'express'
import { SellerLogin, SignupSeller } from '../../Controller/Web/SellerAccount.controller.js';


let SellerRoute  = express.Router();

SellerRoute.post('/SellerAccountSignUP',SignupSeller)
SellerRoute.post('/SellerAccountSignIn',SellerLogin)

export default SellerRoute