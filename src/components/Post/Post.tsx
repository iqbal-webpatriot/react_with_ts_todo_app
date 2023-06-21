
 import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
// All post type definition
export type AllPost = {
  id: number;
  body:string;
    title:string;
}
export const Post = () => {
    const [allPost,setAllPost]=useState<unknown[] |[] >([]);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then((post)=>{
            setAllPost(post.data)
        }).catch((err)=>{
            console.log('error',err)
        })
    },[])
     console.log('allPost',allPost)

  return (
    <>
   <div className='container mx-auto p-2 my-32 ' >
   {
      // best way to render dynamic api response data when type is unknown
        allPost.length>0 &&  allPost.map((currentPost)=>{
            //! telling typescript that currentPost eventually will be of type AllPost 
            const post= currentPost as AllPost
             
            return(
                <div key={post.id} className="bg-gray-200 p-2 my-2 h-auto">
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <p className="text-sm">{post.body}</p>
                </div>
            )
        }
        )
    }
   </div>
    </>
  )
}
