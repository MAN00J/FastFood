import express from 'express'
import { SignupUser, UserLogin } from '../../Controller/Web/UserAccount.controller.js';

let UserRoute  = express.Router();

UserRoute.post('/UserAccountSignUP',SignupUser)
UserRoute.post('/UserAccountSignIn',UserLogin)

export default UserRoute