import { useRouter } from 'next/router';
import { usePost } from '~/utils/hooks/usePosts';

const PostViewPage = () => {
  const id = useRouter().query.id as string;
  const { isLoading, data: post } = usePost({ id });

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{post?.title}</h1>
      <em>Created {post?.createdAt.toLocaleDateString()}</em>

      <p>{post?.text}</p>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(post, null, 4)}</pre>
    </>
  );
};

export default PostViewPage;
