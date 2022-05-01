import { useRouter } from 'next/router';
import { Button } from '~/components/Button';
import { Feedback } from '~/components/Feedback';
import { Input } from '~/components/Form';
import { useSignup } from '~/utils/hooks/useRegistration';

const SignUp = () => {
  const router = useRouter();
  const {
    createUser,
    error,
    setPassword,
    setEmail,
    setRepeatPassword,
    isFilledIn,
  } = useSignup();

  const createAccount = (e) => createUser(e, router);

  return (
    <>
      <form onSubmit={createAccount} className="max-w-[500px] m-auto p-15">
        <h2 className="text-center pb-8 font-bold text-3xl">Sign up</h2>
        <div className="mb-6">
          <Input
            label="Email"
            id="email"
            placeholder="hey@example.com"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
          Create Account
        </Button>
      </form>
    </>
  );
};

export default SignUp;
