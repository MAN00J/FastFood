import bcrypt from 'bcryptjs'


const saltround =  process.env.Salt_round || 10;

export const BcryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltround);
    const hash = await bcrypt.hash(password, salt);
    
    return hash;
  } catch (err) {
    
    throw err;
  }
};


