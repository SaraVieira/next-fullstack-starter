import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getToken } from 'next-auth/jwt';
import { prisma } from './prisma';

// The app's context
// In every request you will now receive the user
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const token = await getToken({ req: opts?.req as any });
  if (!token) return { user: null };
  const user = await prisma.user.findFirst({
    where: { email: token.email },
  });

  return { user };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
