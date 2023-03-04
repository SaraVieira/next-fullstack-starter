import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getToken } from 'next-auth/jwt';
import { prisma } from './prisma';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

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
