
import Updatepostform from '@/components/Updatepostform'
import { POST_QUERY } from '@/lib/queries'
import { client } from '@/sanity/lib/client'
import React from 'react'

const UpdateForm = async({params}:{params:Promise<{id:string}>}) => {
  const id=(await params).id
  const post=await client.fetch(POST_QUERY,{id})
  console.log(post)
  return (
    <>
    <section className="pink_container !min-h-[230px]">

        <h1 className="heading">Submit </h1>
    </section>
    <Updatepostform id={id} post={post}/>
    
    </>
  )
}

export default UpdateForm