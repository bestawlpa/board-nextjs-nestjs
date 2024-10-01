import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const handler = NextAuth({


    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username } = credentials;
                try {
                    const res = await fetch(`${apiUrl}/users`)
                    const users = await res.json();
                    const user = users.find(user => user.username === username)
                    console.log('test-user', user);
                    if (!user) {
                        return null;
                    };
                    return user;

                } catch (error) {

                }
            }
        })
    ],
    session: {
        jwt: true,
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                if (user._id) token._id = user._id;
                if (user.username) token.username = user.username;
                if (user.email) token.email = user.email;
                if (user.urlImg) token.urlImg = user.urlImg;
            }
            return token;
        },
        async session({ session, token }) {
            if (token._id) session.user._id = token._id;
            if (token.username) session.user.username = token.username;
            if (token.email) session.user.email = token.email;
            if (token.urlImg) session.user.urlImg = token.urlImg;
            if (token.sub) session.user._id = token.sub;
            return session;
        },
    }


});

export { handler as GET, handler as POST }