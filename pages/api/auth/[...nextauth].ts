// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../Schema/UserSchema';
import connectDB from '../../../libs/dbconnect';
import bcrypt from 'bcrypt';

// Define the User type
interface UserType {
    id:string
    email: string;
    name: string;
}

// Define NextAuth options
const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectDB();

                // Ensure credentials are defined
                if (!credentials) {
                    return null; // Return null if credentials are not provided
                }

                const user = await User.findOne({ email: credentials.email });
                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    return {id:user._id , email: user.email, name: user.name } as UserType; // Ensure correct type here
                }
                return null;
            },
        }),
    ],
    session: {
        strategy:"jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            // Ensure that session.user is defined
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Set a secret for JWT signing
};

// Export default function
export default NextAuth(options);
