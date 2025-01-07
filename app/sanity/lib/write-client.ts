import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId ,token} from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"skMhfuGDLJZGc8Cryr2Q82saN8GLkocIUSpIsHYevcKkWBhTZFo6sagTo88StU7cAlgeSJ3FHY8Gd9Cn289pK9yqAJRPqwWXbtBM6jJrmPhmo8BCNZKWFiG3nbM8DYNYORLzN6icIYRxKQoZT1EoYZfjaGXdBl1gt5qsePX1jXmqJVsjiLVL"
})

if(!writeClient.config().token){
    throw new Error("Token not found")
}