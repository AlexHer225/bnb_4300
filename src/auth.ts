import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./app/models/userSchema";
import connectMongoDB from "../config/mongodb";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          connectMongoDB();
          const user = await User.findOne({ username: credentials.username }).lean();

          if (user) {
            const isMatch = await bcrypt.compare(
              typeof credentials.password === "string" ? credentials.password : "",
              user.passwordHashed,
            );

            if (isMatch) {
              return {
                id: user._id.toString(),
                username: user.username,
              };
            } else {
              console.log("Username or Password is not correct");
              return null;
            }
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error: any) {
          console.log("An error occurred: ", error);
          return null;
        }
      },
    }),
  ],
});