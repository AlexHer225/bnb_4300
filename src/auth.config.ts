import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface credentalsType {
  username: string;
  password: string;
}

const getUserByCredentials = async (username: string, password: string) => {
  const response = await fetch(`/api/users/${username}`);
  const user = await response.json();
  if (username == user.username && password == user.password) {
    // console.log('GET USER BY CREDS: ', user);
    return user;
  }
  else {
    // console.log('ERROR: FAILED TO GET USER');
    return 'ERROR: Failed to get user';
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await getUserByCredentials(
          String(credentials.username),
          String(credentials.password)
        );

        if (!user) return null;

        return {
          id: user._id,
          name: user.name,
          username: user.userName,
          password: user.confirmPassword,
          excludeCuisine: user.excludeCuisine,
          diet: user.diet,
          intolerances: user.intolerances,
          excludeIngredients: user.excludeIngredients,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};
