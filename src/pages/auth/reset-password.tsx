import { useRouter } from 'next/router';
import { Button } from '~/components/Button';
import { Feedback } from '~/components/Feedback';
import { Input } from '~/components/Form';
import { useResetPassword } from '~/utils/hooks/useRegistration';

const ResetPassword = () => {
  const router = useRouter();
  const { updatePassword, error, setPassword, setRepeatPassword, isFilledIn } =
    useResetPassword();

  return (
    <>
      <form
        onSubmit={(e) => updatePassword(e, router)}
        className="max-w-[500px] m-auto p-15"
      >
        <h2 className="text-center pb-8 font-bold text-3xl">
          Change your password
        </h2>

        <div className="mb-6">
          <Input
            label="Password"
            placeholder="super complicated password"
            required
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <Input
            label="Repeat Password"
            id="repeat-password"
            placeholder="super complicated password"
            required
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <Feedback variant="error" message={error} />}
        <Button type="submit" disabled={!isFilledIn()}>
          Update Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
