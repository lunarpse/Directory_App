import { POST_BY_AUTHORID_QUERY } from '@/lib/queries'
import { client } from '@/sanity/lib/client'
import React from 'react'
import Postcard, { Postcardtype } from './PostCard'

const Userposts = async({id}:{id:string}) => {
    const posts=await client.fetch(POST_BY_AUTHORID_QUERY,{id})
    console.log(id)
    console.log(posts)
  return (
    <>
    {posts.length>0?(
        posts.map((post:Postcardtype)=>(
            <Postcard post={post} />
        ))
    ):(
        <p className="no-result">No Posts Yet</p>
    )}
    </>
  )
}

export default Userposts