import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatdate=(date:string)=>{
  return new Date(date).toLocaleDateString('en-US',{
    month:'long',
    day:'numeric',
    year:'numeric'
  })
}

export const parseserveractionresponse=(response:any)=> {
  return JSON.parse(JSON.stringify(response));
}
