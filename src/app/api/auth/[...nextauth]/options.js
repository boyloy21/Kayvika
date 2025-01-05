import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/User";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";


export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("Profile GitHub: ", profile);

                let userRole = "GitHub User";
                if (profile?.email == "yun@boyloy.com") {
                    userRole = "Admin";
                }
                return {
                    ...profile,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User";
                if (profile?.email == "yinchheanyun21@gmail.com") {
                    userRole = "Admin";
                }
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // username: { label: "Username", type: "text", placeholder: "username" },
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const foundUser = await Users.findOne({ email});
                        // .lean()
                        // .exec();
                    if (!foundUser) {
                        return null;
                    }
                    const match = await bcrypt.compare(
                        password,
                        foundUser.password
                    );
                    if (!match) {
                        return null;
                    }
                    else {
                        foundUser["role"] = "Unverified Email";
                        foundUser["name"] = foundUser.username;
                        return foundUser;
                    }
                    // if (foundUser) {
                    //     console.log("User Exists");
                        

                    //     if (match) {
                    //         console.log("Good Pass");
                    //         delete foundUser.password;

                    //         foundUser["role"] = "Unverified Email";
                    //         foundUser["name"] = foundUser.username;
                    //         return foundUser;
                    //     }
                    // }
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.name = user.name; // Include name in token
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.name = token.name; // Include name in session
            }
            return session;
        },
    },
    pages: {
        signIn : "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
}