import nodemailer from 'nodemailer';
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/prisma';
import { hashPassword } from '~/utils/password';

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { email, token, id, password } = JSON.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        email,
        id,
        resetToken: token,
      },
    });

    if (!user) {
      return res.status(500).json({
        message: 'User not found',
        ok: false,
      });
    }
    const hashedPassword = await hashPassword(password);
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHashed = await hashPassword(resetToken);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        resetToken: resetTokenHashed,
      },
    });

    res.status(200).json({
      status: 'updated',
      ok: true,
    });
  }
  if (req.method == 'POST') {
    const { email } = JSON.parse(req.body);
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(500).json({
        message: 'User not found',
        ok: false,
      });
    }

    const link = `${process.env.NEXTAUTH_URL}/reset-password?email=${email}&id=${user.id}&token=${user.resetToken}`;

    const options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <html>
            <head>
                <style>
                </style>
            </head>
            <body>
                <p>Hello,</p>
                <p>You requested to reset your password.</p>
                <p> Please, click the link below to reset your password</p>
                <a href="${link}">Reset Password</a>
            </body>
        </html>
        `,
    };
    // Send email
    transporter.sendMail(options, (error) => {
      if (error) {
        return res.status(500).json({
          message: error,
          ok: false,
        });
      } else {
        return res.status(200).json({
          ok: true,
        });
      }
    });
  }
};

export default SignUp;
