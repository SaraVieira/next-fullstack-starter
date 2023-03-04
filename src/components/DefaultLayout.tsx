import { ReactNode } from 'react';
import { Header } from './header';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <div className="min-h-screen text-white py-8">
        <Header />
        <main className="max-w-[80%] w-7xl m-auto mt-8 mb-16">{children}</main>
      </div>
    </>
  );
};
