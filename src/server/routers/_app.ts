import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
});

export type AppRouter = typeof appRouter;
