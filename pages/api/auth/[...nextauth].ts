import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        // Add logic here to look up the user from the credentials supplied
        // verify user with backend
        const { email, password } = credentials;
        const user = {
          id: "holtonpk@gmail.com",
          email: "holtonpk@gmail.com",
          password: "12345678",
        };

        if (user.password === password && user.email === email) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
