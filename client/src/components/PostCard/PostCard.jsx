import React from 'react'
// import context
import { UserState } from "../../context/UserProvider";
// mutations/queries
import { DELETE_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';



  const PostCard =  ({post})  =>  {
    const {loggedInUser} = UserState()
    const [deletePost, {error}] = useMutation(DELETE_POST)

    if(loggedInUser){
    console.log('UserState()', UserState())
    console.log('postCard', post)
    console.log('loggedInUser', loggedInUser)
    

    

    const handleDelete = async () =>{
        const { data } = await deletePost({
            variables:  {postId: post._id, userId: loggedInUser._id },
          });
          console.log(data)
    }
  return (
    <div className='border-warning bg-dark text-white w-50'>PostCard
        <h2>{post.postTitle}</h2>
        <p>{post.postText}</p>
        <small>{post.postedBy.username}</small>
        {post.postedBy._id === loggedInUser._id && <button className='btn btn-danger' onClick={handleDelete}>Delete</button>}
    </div>
  )
    }
}

export default PostCard