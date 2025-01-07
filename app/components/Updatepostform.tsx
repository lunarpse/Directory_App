'use client'
import { useToast } from '@/hooks/use-toast';
import { postinfo, updatedoc } from '@/lib/actions';
import { formschema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { z } from 'zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Post } from '@/sanity/types';

const Updatepostform = ({id,post}:{id:string,post:postinfo}) => {
  
    const [errors,seterrors]=useState<Record<string,string>>({});
    
    const {toast}=useToast();
    const router=useRouter();
    const [title,settitle]=useState(post.title)
    const [description,setdescription]=useState(post.description)
    const [category,setcategory]=useState(post.category)
    const [image,setimage]=useState(post.image)
    const [about,setabout]=useState(post.about)
    const [isloading,setloading]=useState(false)
    

   const handlesubmit=async()=>{
    setloading(true)
        try {
          const formvalues={
            title,
            description,
            category,
            image,
            about                                                     
          }
          console.log("a")
          await formschema.parseAsync(formvalues)
          console.log("b")
          console.log(formvalues)
          const res=await updatedoc(formvalues,id)
          console.log(res)
          
          if(res?.status==="SUCCESS"){
            toast({
              title:"Success",
              description:"Your post has been updated"
            })
            console.log(res)
            router.replace(`/post/${id}`)
          }
          return res

            
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErorrs = error.flatten().fieldErrors;
    
            seterrors(fieldErorrs as unknown as Record<string, string>);
    
            toast({
              title: "Error",
              description: "Please check your inputs and try again",
              variant: "destructive",
            });
    
            return { error: "Validation failed", status: "ERROR" };
        }
    }
    setloading(false)
    }



  return (
    <form onSubmit={handlesubmit} className='startup-form'>
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input
            id='title'
            value={title}
            onChange={e=>settitle(e.target.value)}
            placeholder='Post Title'
            className='startup-form_input'
            required
            name='title'
            />
              {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
            <Textarea 
            name='description'
            value={description}
            onChange={e=>setdescription(e.target.value)}
            id='description'
            className='startup-form_textarea'
            required
            placeholder='Startup description'
            />
               {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
        </div>


        <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          value={category}
          onChange={e=>setcategory(e.target.value)}
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="startup-form_label">
          Image URL
        </label>
        <Input
        value={image}
        onChange={e=>setimage(e.target.value)}
          id="image"
          name="image"
          className="startup-form_input"
          required
          placeholder="Post Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>


      <div data-color-mode="light">
        <label htmlFor='about' className='startup-form_label'>About</label>
        <MDEditor
        value={about}
        onChange={val=>setabout(val as string)}
        id='about'
        preview='edit'
        height={300}
        textareaProps={{
          placeholder:
          "Briefly describe your idea and what problem it solves",
        }}
        style={{ borderRadius: 20, overflow: "hidden" }}
        previewOptions={{
          disallowedElements:['style']
        }}
        />
           {errors.about && <p className="startup-form_error">{errors.about}</p>}
      </div>
   <Button type='submit' className='text-white'>
    {isloading?"Updating ....":"Update"}
    <Send className='size-6 ml-2'/>
   </Button>
    </form>
  )
}

export default Updatepostform