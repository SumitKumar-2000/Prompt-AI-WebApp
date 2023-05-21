import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({  

    providers: [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async session({ session, user }) {
            if (user) {
              session.user.id = user._id.toString();
            }
            return session;
        }, 
    
        async signIn({profile}){
    
            try {
                await connectToDB();
    
                // check user already exist or not
                const userExist = await User.findOne({email: profile.email})
        
                // create new user
                if(!userExist){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                
                return true;
            } catch (error) {
                console.log("User signIn error: ",error);
            }
        }   
    },
})


export { handler as GET, handler as POST };