import { sanityFetch } from '@/lib/live';
import { PLAYLIST_BY_SLUG_QUERY, POST_QUERY } from '@/lib/queries';
import { formatdate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from "markdown-it";
import View from '@/components/View';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import Postcard, { Postcardtype } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Newbtn from '@/components/Newbtn';

export const experimental_ppr=true;
const md=markdownit();

const PostDetailPage = async ({params}:{params:Promise<{id:string}>}) => {
    const postid=(await params).id;
    const session=await auth();
    console.log(session)
    console.log(postid)
   
   

   const [post,editorpicks]=await Promise.all([
    client.fetch(POST_QUERY,params),
    client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-pick-s'}) || []
   ])

    console.log(post)
    console.log(editorpicks)
   
   if(!post){
    return notFound();
   }



  


   const parsecontent=md.render(post.about || "")
  return (
    <>
    <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatdate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
    </section>
    <section className="section_container">
        <img src={post.image} alt="post" className='w-full h-auto rounded-xl' />                                        
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          
            <div className="flex-between gap-5">
            <Link href={`/user/${post.author._id}`} className='flex gap-2 items-center mb-3'>
            <Image
            src={post.author.image}
            alt='author'
            className='rounded-full drop-shadow-lg'
            width={64}
            height={64}
            />
            <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                    @{post.author.username}
                </p>
            </div>
            </Link>

            <p className="category-tag">{post.category}</p>

            </div>

            <h3 className="text-30-bold">Details</h3>
            {parsecontent ?(
                <article
                className='prose max-w-4xl font-work-sans'
                dangerouslySetInnerHTML={{__html:parsecontent}}/>
            ):(
                <p className="no-result">
                No Details Provided
                </p>
            )}

        <div className="mt-7 gap-8 flex justify-between text-white">
           <Newbtn id={post._id} name="Update"/>
           <Newbtn id={post._id} playlistid={editorpicks._id} name="Delete"/>
           
           
            
        </div>


        </div>
        <hr className="divider" />


        {editorpicks.length>0 && (
            <div className="max-w-4xl mx-auto">
                <p className="text-30-semibold">Editor Picks</p>
                <ul className="mt-7 card_grid-sm">
                    {editorpicks.map((post:Postcardtype,i:number)=>(
                        <Postcard key={i} post={post} />

                    ))}
                </ul>
            </div>
        )}





        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
            <View id={(await params).id} />
        </Suspense>
    </section>
    
    </>
  )
}

export default PostDetailPage