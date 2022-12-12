import bcrypt from 'bcryptjs';

const data = async (password) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};

export default data;
