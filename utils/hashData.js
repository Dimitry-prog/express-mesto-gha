import bcrypt from 'bcryptjs';

const hashData = async (password) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};

export default hashData;
