import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { usePost } from '~/utils/hooks/usePosts';

const PostViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const { error, isLoading, data: post } = usePost({ id });

  if (error) {
    return (
      <NextError
        title={error.message}
        statusCode={error.data?.httpStatus ?? 500}
      />
    );
  }

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
