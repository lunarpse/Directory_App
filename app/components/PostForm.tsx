'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { formschema } from '@/lib/validation'
import { z } from 'zod'
import MDEditor from "@uiw/react-md-editor";
import { createdoc } from '@/lib/actions'

function Postform (){


    const [errors,seterrors]=useState<Record<string,string>>({});
    const [about,setabout]=useState("")
    const {toast}=useToast();
    const router=useRouter();
    
   const handlesubmit=async(prevstate:any,formdata:FormData)=>{
        try {
          const formvalues={
            title:formdata.get("title") as string,
            description:formdata.get("description") as string,
            category:formdata.get("category") as string,
            image:formdata.get("image") as string,
            about                                                     
          }
          console.log("a")
          await formschema.parseAsync(formvalues)
          console.log("b")
          console.log(formvalues)
          const res=await createdoc(prevstate,formdata,about)
          if(res?.status==="SUCCESS"){
            toast({
              title:"Success",
              description:"Your post has been created"
            })
            console.log(res)
            router.push(`/post/${res?._id}`)
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
    
            return { ...prevstate, error: "Validation failed", status: "ERROR" };
        }
    }
    }


const [state,formaction,ispending]=useActionState(handlesubmit,null)    


const handlechange=(e:any)=>{
  const { name, value } = e.target;
  formaction({ ...state, [name]: value }); 
}

  return (
    <form action={formaction} className='startup-form'>
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input
            id='title'
           
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
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
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
   <Button className='text-white'>
    {ispending?"Submitting ....":"Submit"}
    <Send className='size-6 ml-2'/>
   </Button>
    </form>
  )
}

export default Postform;