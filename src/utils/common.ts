import * as bcrypt from 'bcrypt';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const saltOrRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
