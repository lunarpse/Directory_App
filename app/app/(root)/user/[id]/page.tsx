import { auth } from '@/auth';
import Postcardskeleton from '@/components/Postcardskeleton';
import Userposts from '@/components/UserPosts';

import { AUTHOR_QUERY, AUTHOR_QUERY_BY_GOOGLE_ID } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import React, { Suspense } from 'react'

const UserDetailPage = async({params}:{params:Promise<{id:string}>}) => {
  const id=(await params).id;
  console.log(id)
  const session=await auth();
  console.log(session)
  const user=await client.fetch(AUTHOR_QUERY_BY_GOOGLE_ID,{id})
  console.log(user)
    return (
    <>
    <section className="profile_container">
        <div className="profile_card">
            <div className="profile_title">
                <h3 className="text-24-black uppercase text-center line-clamp-1">
                    {user.name}
                </h3>
            </div>

            <Image
            width={220}
            height={220}
            src={user.image}
            alt={user.name}
            className='profile_image'
            />
            <p className="text-30-extrabold mt-7 text-center">
                @{user.username}
            </p>
        </div>


        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
            <p className="text-30-bold">
                {session?.id===id?"Your":"All"} Your Data
            </p>
            <ul className="card_grid-sm">
                <Suspense fallback={<Postcardskeleton/>}>
                    <Userposts id={user._id}/>
                </Suspense>
            </ul>
        </div>
    </section>
    </>
  )
}

export default UserDetailPage