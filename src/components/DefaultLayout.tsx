import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="min-h-screen text-white py-8">
        <header>
          <ul className="flex gap-4 max-w-7xl mx-auto">
            <li>
              <Link href="/">
                <a className="underline">Home</a>
              </Link>
            </li>
            {session?.user ? (
              <>
                <Link href="/create-post">
                  <a className="underline">Create Post</a>
                </Link>
                <button onClick={() => signOut()} className="underline">
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/signin">
                <a className="underline">Sign In</a>
              </Link>
            )}
          </ul>
        </header>
        <main className="max-w-7xl m-auto mt-8 mb-16">{children}</main>
      </div>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
