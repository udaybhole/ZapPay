import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "Enter Your Linked Number", required: true },
                password: { label: "Password", type: "password", placeholder:"******",required: true }
            },
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    const balance = (Math.random() * 1000);
                    await db.balance.create({
                        data: {
                            userId: user.id,
                            amount: balance,
                            locked: 0

                        }
                    });



                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }

                } catch (e) {
                    console.error(e);
                }

                return null
            },
        })
        
    ],
    
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        },

        async jwt({ token, user } : any) {
            if (user) {
                token.id = user.id; // Attach user ID to the token
            }
            return token;
        }
    
           
          
    }

}
