import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import Postcard, {Postcardtype } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/lib/live";
import { ST } from "next/dist/shared/lib/utils";
import { auth } from "@/auth";

async function Home({searchParams}:{
  searchParams:Promise<{query?:string}>
}) {
  const query=(await searchParams).query;
  const params={search:query || null}
  console.log(query)
  const session=await auth();
  console.log(session)
  console.log(session?.id)
  const {data:posts}=await sanityFetch({query:POSTS_QUERY,params})
  return (
   <>
   <section className="pink_container">
    <h1 className="heading">
      Store your valuable data<br/>
      and memories 
    </h1>
    <p className="sub-heading !max-w-3xl">
      Add your memories or ideas and share with the world
    </p>
    <SearchForm query={query}/>
   </section>

   <section className="section_container">
    <p className="text-30-semibold">
      {query?`Search results for ${query}`:"All Posts"}
    </p>
    <ul className="mt-7 card_grid">
      {posts.length>0?(
        posts.map((post: Postcardtype)=>(
          <Postcard post={post}/>
        ))
      ):(
        <p className="no-results">Nothing Found</p>
      )}
    </ul>
   </section>
   <SanityLive/>
   </>
  );
}
export default Home;



