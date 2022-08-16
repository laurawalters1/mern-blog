import React from 'react'

function PostCard({post}) {
    console.log('postCard', post)
  return (
    <div className='border-warning bg-dark text-white w-50'>PostCard
        {/* <h2>{post.postTitle}</h2> */}
        <p>{post.postText}</p>
    </div>
  )
}

export default PostCard