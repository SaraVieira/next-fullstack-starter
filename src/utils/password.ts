import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(
    password,
    Number(process.env.NEXTAUTH_SECRET as string),
  );
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
