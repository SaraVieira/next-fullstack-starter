import { ISODateString } from 'next-auth';

export type NewSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
};
