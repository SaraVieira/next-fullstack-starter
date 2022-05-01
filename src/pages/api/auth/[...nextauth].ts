import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '~/server/prisma';
import { verifyPassword } from '~/utils/password';
import { NewSession } from '~/utils/types';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session }: { session: NewSession }): Promise<NewSession> {
      if (!session?.user?.email) return { expires: new Date().toDateString() };
      const idUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!idUser) return { expires: new Date().toDateString() };
      session.user.id = idUser.id;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
      ) {
        if (!credentials?.password || !credentials?.email) {
          throw new Error('User not fund');
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('User not fund');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        return { email: user.email };
      },
      name: 'Email & Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
