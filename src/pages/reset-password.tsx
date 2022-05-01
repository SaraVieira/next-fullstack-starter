import { XCircleIcon } from '@heroicons/react/solid';

import { useRouter } from 'next/router';
import { Button } from '~/components/Button';
import { Input, Label } from '~/components/Form';
import { useResetPassword } from '~/utils/hooks/useRegistration';

const ResetPassword = () => {
  const router = useRouter();
  const { updatePassword, error, setPassword, setRepeatPassword, isFilledIn } =
    useResetPassword();

  const createAccount = (e) => updatePassword(e, router);

  return (
    <>
      <form onSubmit={createAccount} className="max-w-[500px] m-auto p-15">
        <h2 className="text-center pb-8 font-bold text-3xl">
          Change your password
        </h2>

        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="super complicated password"
            required
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <Label htmlFor="email">Repeat Password</Label>
          <Input
            id="repeat-password"
            placeholder="super complicated password"
            required
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
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
        <Button type="submit" disabled={!isFilledIn()}>
          Update Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
