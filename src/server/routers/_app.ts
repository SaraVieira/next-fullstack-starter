import { createRouter } from '../createRouter';
import { postRouter } from './post';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('post.', postRouter);

export type AppRouter = typeof appRouter;
