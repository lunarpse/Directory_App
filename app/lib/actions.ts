"use server"
import { auth } from "@/auth"
import { CaseLower } from "lucide-react";
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client";
import { parseserveractionresponse } from "./utils";
import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY_BY_GOOGLE_ID, PLAYLIST_BY_ID_QUERY } from "./queries";
import { error } from "console";
import { redirect } from "next/navigation";

export interface postinfo{
    title:string,
    description:string,
    category:string,
    image:string,
    about:string
}

export const createdoc=async(prevstate:any,formdata:FormData,about:string)=>{
    const session=await auth();
    console.log(session)
    console.log(formdata)
    if(!session){
        return parseserveractionresponse({
            error:"Not Signed In",
            status:"ERROR"

        })
    }
    const user=await client.fetch(AUTHOR_QUERY_BY_GOOGLE_ID,{id:session.id})
    console.log(user)
    const {title,description,image,category}=Object.fromEntries(
        Array.from(formdata).filter(([key])=>key!=="about")
    )
    const slug=slugify(title as string,{lower:true,strict:true})
    try {

         const doc={
            title,
            description,
            image,
            views:1,
            category,
            about,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:"reference",
                _ref:user?._id
            }
         }

         const res=await writeClient.create({_type:"post",...doc})
        return parseserveractionresponse({
            ...res,
            error:"",
            status:"SUCCESS"
        })
    } catch (error) {
        return parseserveractionresponse({
            error: JSON.stringify(error),
            status: "ERROR",
          })
    }
}

// export const removePlaylistReference=async(id:string)=>{
//     try {
//         const res=await writeClient.patch(id).set({...})
//     } catch (error:any) {
//         throw new Error(`Unable to unlink post ${error.message}`)
//     }
// }

export const deletedoc=async(id:string,playlistid?:string)=>{
    console.log(playlistid)
    try {
        if(playlistid){
        const playlist=await client.fetch(PLAYLIST_BY_ID_QUERY,{id:playlistid});
        console.log(playlist)
        const newplaylist=await writeClient.patch(playlistid).set({...playlist,select:playlist.select.filter((post:any)=>post._id!==id)}).commit();
        console.log(newplaylist)
        }
        
        await writeClient.delete(id).then(()=>{
            redirect('/')
        });
       
        

    } catch (error:any) {
        throw new Error(`Unable to delete post ${error.message}`)
    }
}

export const updatedoc=async(data:postinfo,id:string)=>{
    const {title,description,category,about,image}=data;
    const slug=slugify(title as string,{lower:true,strict:true})
    console.log(data)
    console.log(title)
    try {


        const res=await writeClient.patch(id).set({...data,slug:{
            _type:slug,
            current:slug
        }}).commit()
        return parseserveractionresponse({
            ...res,
            error:"",
            status:"SUCCESS"
        })
        
    } catch (error:any) {
        throw new Error(`Unable to update post ${error.message}`)
    }



}