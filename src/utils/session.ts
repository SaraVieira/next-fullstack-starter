import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { encode, getToken, JWT } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { prisma } from '~/server/prisma';
import { ERROR_MESSAGES } from './constants/errors';
import { NewSession } from './types';

const signInRedirect = {
  redirect: {
    destination: '/signin',
    permanent: false,
  },
};

function validateSession({
  session,
  redirectCondition,
}: {
  session: NewSession;
  redirectCondition: any;
}) {
  if (redirectCondition) {
    return signInRedirect;
  }

  return { props: { session } };
}

/**
 * Usually necessary for sign in pages.
 */
export const redirectIfAuthenticated = async (
  context: GetServerSidePropsContext,
) => {
  const session = (await getSession(context)) as NewSession;
  return validateSession({ session, redirectCondition: session });
};

/**
 * No need to fetch anything else server side, validate if the user is authenticated or redirect to
 * the homepage.
 * @returns session or the redirect object for getServerSideProps or getStaticProps
 */
export const validateUserSession = async (
  context: GetServerSidePropsContext,
) => {
  const session = (await getSession(context)) as NewSession;
  return validateSession({
    session,
    redirectCondition: !session,
  });
};

/**
 * When we need to fetch more information inside getServerSideProps or getStaticProps but also
 * verifying the session, this helper will do just that.
 *
 * @param {*} context
 * @param {*} fetcherFn all the fetch logic specific to each page
 * @returns redirect object or the return object of the fetcherFn function
 */
export async function validateSessionAndFetch(
  context: GetServerSidePropsContext,
  fetcherFn: (session: NewSession) => any,
) {
  const session = (await getSession(context)) as NewSession;
  if (!session) {
    return signInRedirect;
  }
  return fetcherFn(session);
}

export async function isAuthenticatedAPIRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken({ req });
  if (isAuthenticated(token?.email) && token) {
    const user = await prisma.user.findFirst({
      where: { email: token.email },
    });

    return user;
  } else {
    res.status(401).json({
      error: ERROR_MESSAGES.LOGIN_REQUIRED,
    });
    return;
  }
}

export function isAuthenticated(value: any) {
  return Boolean(value);
}

export async function createAuthHeaders({ req }: { req: NextApiRequest }) {
  const token = await getToken({ req: req });
  const encodedToken = await encode({
    token: token as JWT,
    secret: process.env.NEXTAUTH_SECRET as string,
  });
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${encodedToken}`,
    },
  };
}
