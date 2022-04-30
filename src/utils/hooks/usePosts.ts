import { trpc } from '../trpc';

export const usePosts = () => {
  const postsQuery = trpc.useQuery(['post.all']);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return postsQuery;
};

export const useCreatePost = () => {
  const utils = trpc.useContext();
  const addPost = trpc.useMutation('post.add', {
    async onSuccess() {
      await utils.invalidateQueries(['post.all']);
    },
  });

  return addPost;
};

export const usePost = ({ id }) => {
  const postQuery = trpc.useQuery(['post.byId', { id }]);

  return postQuery;
};
