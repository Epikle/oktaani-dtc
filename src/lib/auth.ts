import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Missing env for auth.');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn({ user }) {
      const isAllowedToSignIn = ['qwia.net'].some((domain) => {
        const emailSplit = user.email?.split('@');
        return emailSplit?.[emailSplit.length - 1].toLowerCase() === domain;
      });

      return isAllowedToSignIn;
    },
  },
};
