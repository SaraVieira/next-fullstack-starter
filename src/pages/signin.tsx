import { useRouter } from 'next/router';

import { Input, Label } from '~/components/Form';

import { Button } from '~/components/Button';
import { XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useSignIn } from '~/utils/hooks/useRegistration';
import { redirectIfAuthenticated } from '~/utils/session';

function SignIn() {
  const { isFilledIn, setPassword, setEmail, error, signIn, signingIn } =
    useSignIn();
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={(e) => signIn(e, router)}
        className="max-w-[500px] m-auto p-15"
      >
        <h2 className="text-center pb-8 font-bold text-3xl">Sign In</h2>
        <div className="mb-6">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <Label htmlFor="password">Your Password</Label>
          <Input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="rounded-md bg-red-50 p-4 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <Button disabled={!isFilledIn()} type="submit" loading={signingIn}>
          Login
        </Button>
      </form>

      <Link href="/signup">
        <a className="block mt-6 text-center text-opacity-50 hover:text-opacity-100 text-white disabled:opacity-50">
          Sign Up
        </a>
      </Link>
    </>
  );
}
export const getServerSideProps = redirectIfAuthenticated;

export default SignIn;
