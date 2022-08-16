import React from 'react'
import {
  PostCard
} from "../../components";

function MyPosts({posts}) {
    console.log('MyPosts', posts)
  return (
  <>
   

    {posts.map((post) => <PostCard post={post}/>
    )}

  </>
  )
}

export default MyPosts