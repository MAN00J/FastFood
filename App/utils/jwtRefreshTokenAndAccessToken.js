import jwt from "jsonwebtoken";

export const JwtRefreshTokenAndAccessToken = async(User) =>{
try{
    
    const accessToken =  jwt.sign(
        {
            id : User._id,
            Email : User.Email,
            Name :User.name
        },
        process.env.JWTAccessSecret
        ,{
            expiresIn :process.env.JWTAccessExpires
        }
    )

    const refreshToken =  jwt.sign(
        {
            id : User._id,
            Email : User.Email,
            Name :User.name
        },
        process.env.JWTRefreshSecret
        ,{
            expiresIn :process.env.JWTRefreshExpires
        }
    )
    
    return {accessToken,refreshToken}
}catch{
  return resizeBy.json({message:"error"})
}
}