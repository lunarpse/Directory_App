import { Container } from 'postcss'
import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { POST_VIEWS } from '@/lib/queries'
import {after} from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'


const View =async ({id}:{id:string}) => {
    console.log(id)
    const params={id}
    const {views:totalviews}=await client.withConfig({useCdn:false}).fetch(
       POST_VIEWS,params
    )
  

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>
        <p className="view-text">
            <span className="font-black">Views: {totalviews}</span>                       
        </p>
    </div>
  )
}

export default View