// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// // ...or any providers you use

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         // Your login logic
//         return { id: "1", name: "User", email: "user@example.com" };
//       },
//     }),
//   ],
//   // Other options like callbacks, pages, etc.
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


export { GET, POST } from "../../../../auth";