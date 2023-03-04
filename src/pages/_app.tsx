import { trpc } from '~/utils/trpc';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { AppType } from 'next/dist/shared/lib/utils';
import { ReactNode } from 'react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';

export type NextPageWithLayout = NextPage & {
  layout?: ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ((props: AppPropsWithLayout) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
}) as AppType;

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = (Component.layout || DefaultLayout) as any;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}) as AppType;
export default trpc.withTRPC(MyApp);
