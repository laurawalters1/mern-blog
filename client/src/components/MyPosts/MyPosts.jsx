import React from 'react'

function MyPosts({posts}) {
    console.log('MyPosts', posts)
  return (
  <>
    <ul>

    {posts.forEach((post) => <li>{post.postText}</li>
    )}
    </ul>
  </>
  )
}

export default MyPosts