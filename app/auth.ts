import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_QUERY } from "./lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google
  ],
  callbacks:{
    async signIn({user,profile}){
      console.log("llllllllll")
      console.log(user.id)
      console.log(profile?.id)


      const existinguser=await client.fetch(AUTHOR_QUERY,{
        id:user?.id
      })
      console.log("ppppppppppppppp")
      console.log(user)
      console.log(profile)
      

      if(!existinguser){
        await writeClient.create({
          _type:"author",
          id:user?.id,
          name:user.name,
          username:profile?.name,
          email:user.email,
          image:user.image,
          bio:"No Data Provided"
        })
      }
      return true;
    },

    async jwt({token,user}){
      
      if(user){
        
        token.id=user.id;
      }
      return token;
    },

    async session({session,token}){
      Object.assign(session,{id:token.id})
      return session;
    }
  }
})