import React from 'react'
// import context
import { UserState } from "../../context/UserProvider";



function PostCard({post}) {
    const {loggedInUser} = UserState()
    console.log('postCard', post)
    console.log('loggedInUser', loggedInUser)
  return (
    <div className='border-warning bg-dark text-white w-50'>PostCard
        <h2>{post.postTitle}</h2>
        <p>{post.postText}</p>
        <small>{post.postedBy.username}</small>
    </div>
  )
}

export default PostCard