
import React from 'react'
import { form } from 'sanity/structure'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
import { deletedoc } from '@/lib/actions'
import { useToast } from '@/hooks/use-toast'

const Newbtn = ({name,id,playlistid}:{name:string,id:string,playlistid?:string}) => {

  return (
<form action={async()=>
                {
                    "use server"
                    {name=="Update"? redirect(`/post/update/${id}`):(
                      await deletedoc(id,playlistid)

                    )}}
            }>
<Button className='w-full' type='submit'>{name}</Button>

</form>
  )
}

export default Newbtn