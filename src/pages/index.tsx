import Link from 'next/link';
import { usePosts } from '~/utils/hooks/usePosts';

const IndexPage = () => {
  const posts = usePosts();

  return (
    <>
      <h2 className="text-center pb-8 font-bold text-3xl">
        Welcome to the next full stack starter!
      </h2>

      <h3 className="text-xl font-bold py-4">
        Posts
        {posts.isLoading && '(loading)'}
      </h3>
      {posts.data?.map((item) => (
        <article key={item.id} className="my-4">
          <h3 className="font-bold text-lg">{item.title}</h3>
          <Link href={`/post/${item.id}`}>
            <a className="underline">Read more {'->'} </a>
          </Link>
        </article>
      ))}
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
