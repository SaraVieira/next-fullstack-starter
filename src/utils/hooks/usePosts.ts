import { trpc } from '../trpc';

export const usePosts = () => {
  const postsQuery = trpc.post.all.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );
  return postsQuery;
};

export const useCreatePost = () => {
  const utils = trpc.useContext();
  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.all.invalidate();
    },
  });
  return addPost;
};

export const usePost = ({ id }) => {
  const postQuery = trpc.post.byId.useQuery({ id });

  return postQuery;
};
