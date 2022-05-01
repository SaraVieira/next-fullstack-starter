import { signIn } from 'next-auth/react';
import create, { GetState, SetState } from 'zustand';
import { ERROR_MESSAGES } from '../constants/errors';
import { STATES } from '../constants/signin-states';

type useSignInState = {
  error: string;
  email: string;
  password: string;
  signingIn: boolean;
  signIn: (e: any, router: any) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isFilledIn: () => boolean;
};

export const useSignIn = create(
  (set: SetState<useSignInState>, get: GetState<useSignInState>) => ({
    error: '',
    email: '',
    password: '',
    signingIn: false,
    isFilledIn: (): boolean => {
      const { email, password } = get();

      return Boolean(email && password);
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    signIn: async (e: any, router: any) => {
      set({ signingIn: true, error: '' });
      const { email, password } = get();
      e.preventDefault();
      try {
        const signin = (await signIn('credentials', {
          redirect: false,
          email,
          password,
        })) as any;
        if (!signin) return;
        if (signin.error) {
          set({ error: signin.error });
          return;
        }
        router.push('/');
      } catch {
      } finally {
        set({ signingIn: false });
      }
    },
  }),
);

type useSignupState = {
  error: string;
  email: string;
  password: string;
  repeatPassword: string;
  loading: boolean;
  createUser: (e: any, router: any) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRepeatPassword: (password: string) => void;
  isFilledIn: () => boolean;
};

export const useSignup = create(
  (set: SetState<useSignupState>, get: GetState<useSignupState>) => ({
    error: '',
    email: '',
    password: '',
    repeatPassword: '',
    loading: false,
    isFilledIn: (): boolean => {
      const { email, password, repeatPassword } = get();

      return Boolean(email && password && repeatPassword);
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    setRepeatPassword: (repeatPassword: string) => set({ repeatPassword }),
    createUser: async (e: any, router: any) => {
      const { email, password, repeatPassword } = get();
      set({ error: '', loading: true });
      e.preventDefault();

      if (password.length < 6) {
        set({ error: ERROR_MESSAGES.SHORT_PASSWORD, loading: false });
        return;
      }

      if (password !== repeatPassword) {
        set({ error: ERROR_MESSAGES.PASSWORD_NOT_MATCH, loading: false });
        return;
      }
      try {
        const data = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        }).then((rsp) => rsp.json());

        if (!data.ok) {
          set({ error: data.message || 'Something went wrong!' });
        } else {
          await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          router.push('/');
        }
      } catch {
      } finally {
        set({ loading: false });
      }
    },
  }),
);

type useResetPasswordState = {
  error: string;
  password: string;
  repeatPassword: string;
  loading: boolean;
  updatePassword: (e: any, router: any) => void;
  setPassword: (password: string) => void;
  setRepeatPassword: (password: string) => void;
  isFilledIn: () => boolean;
};

export const useResetPassword = create(
  (
    set: SetState<useResetPasswordState>,
    get: GetState<useResetPasswordState>,
  ) => ({
    error: '',
    password: '',
    repeatPassword: '',
    loading: false,
    isFilledIn: (): boolean => {
      const { password, repeatPassword } = get();

      return Boolean(password && repeatPassword);
    },
    setPassword: (password: string) => set({ password }),
    setRepeatPassword: (repeatPassword: string) => set({ repeatPassword }),
    updatePassword: async (e: any, router: any) => {
      const { password, repeatPassword } = get();
      set({ error: '', loading: true });
      e.preventDefault();

      if (password.length < 6) {
        set({ error: ERROR_MESSAGES.SHORT_PASSWORD, loading: false });
        return;
      }

      if (password !== repeatPassword) {
        set({ error: ERROR_MESSAGES.PASSWORD_NOT_MATCH, loading: false });
        return;
      }

      try {
        const data = await fetch('/api/auth/reset-password', {
          method: 'PUT',
          body: JSON.stringify({
            ...router.query,
            password,
          }),
        }).then((rsp) => rsp.json());

        if (!data.ok) {
          set({ error: data.message || 'Something went wrong!' });
        } else {
          router.push('/signin?state=' + STATES.PASSWORD_UPDATED);
        }
      } catch {
      } finally {
        set({ loading: false });
      }
    },
  }),
);
