import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/prisma';
import { ERROR_MESSAGES } from '~/utils/constants/errors';
import { hashPassword } from '~/utils/password';

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    res.status(422).json({ message: ERROR_MESSAGES.USER_EXISTS });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  res.status(200).json({ message: 'Created user!', ok: true });
};

export default SignUp;
