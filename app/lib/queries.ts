import { defineQuery } from "next-sanity";

export const POSTS_QUERY=defineQuery(`*[_type=="post" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author -> {
    _id,name,image,bio
    },
    views,
    description,
    category,
    image,
    about
    }`)



    export const POST_QUERY=defineQuery(`*[_type=="post" && _id==$id][0]{
        _id,
    title,
    slug,
    _createdAt,
    author -> {
    _id,name,image,bio,username,id
    },
    views,
    description,
    category,
    image,
    about

        }`)

    export const POST_VIEWS=defineQuery(`
        *[_type == "post" && _id == $id][0]{
            _id, views
        }
    `);

    export const AUTHOR_QUERY=defineQuery(`*[_type=="author" && _id==$id][0]{
        id,
        _id,
        name,
        username,
        image,
        email,
        bio
        }`)

        export const AUTHOR_QUERY_BY_GOOGLE_ID=defineQuery(`*[_type=="author" && id==$id][0]{
            id,
            _id,
            name,
            username,
            image,
            email,
            bio
            }`)
    export const POST_BY_AUTHORID_QUERY=defineQuery(`*[_type=="post" && author._ref==$id] | order(_createdAt desc){
          _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
        }`)
    



export const PLAYLIST_BY_SLUG_QUERY=defineQuery(`*[_type=="playlist" && slug.current==$slug][0]{
      _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    about
}
    }`)


    export const PLAYLIST_BY_ID_QUERY=defineQuery(`*[_type=="playlist" && _id==$id][0]{
        _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      views,
      description,
      category,
      image,
      about
  }
      }`)