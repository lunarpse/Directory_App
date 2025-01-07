import { formatdate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import {Author, Post} from "@/sanity/types"

export type Postcardtype=Omit<Post,"author"> & {author?:Author}



const Postcard = ({post}:{post:Postcardtype}) => {
    
  return (
    <li className="startup-card group">

        <div className="flex-between">
            <p className="startup_card_date">
                {formatdate(post._createdAt)}
            </p>
            <div className="flex gap-1 5">
                <EyeIcon className="size-6 text-primary"/>
                <span className="text-16-medium">{post.views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${post.author?._id}`}>
                <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
                </Link>
                <Link href={`/post/${post._id}`}>
                <h3 className="text-26-semibold line-clamp-1">{post.title}</h3></Link>
            </div>
            <Link href={`/user/${post.author?._id}`}>
            <Image
            alt='user-image'
            src={post.author?.image || ""}
            className='rounded-full'
            width={48}
            height={48}
            />
            </Link>
        </div>

        <Link href={`/post/${post._id}`}>
        <p className="startup-card_desc">
            {post.description}
        </p>
        <img src={post.image} alt="image" className="startup-card_img" />
        </Link>
       
       <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
        <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
            <Link href={`/post/${post._id}`}>
            Details
            </Link>
        </Button>
       </div>

    </li>
  )
}

export default Postcard