import React, {useState} from 'react'
// import context
import { UserState } from "../../context/UserProvider";
// mutations/queries
import { DELETE_POST } from '../../utils/mutations';
import { UPDATE_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



  const PostCard =  ({post})  =>  {
    const {loggedInUser} = UserState()
    const [show, setShow] = useState(false);
    const [deletePost, {error}] = useMutation(DELETE_POST)
    const [updatePost] = useMutation(UPDATE_POST)
    const [postTitle, setPostTitle] = useState(post.postTitle)
    const [postText, setPostText] = useState(post.postText)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [postFormData, setPostFormData] = useState({
  //   postText: post.postText,
  //   postTitle: post.postTitle,
  //   postId: post._id
  // });

    if(loggedInUser){
    console.log('UserState()', UserState())
    console.log('postCard', post)
    console.log('loggedInUser', loggedInUser)
    
   

    // const handleUserInput = (event) => {
    //   const { name, value } = event.target;
    //   setPostFormData({ ...postFormData, [name]: value });
    // };

    const handleSubmit = async () =>{
      const { data } = await updatePost({
          variables:  {
            postTitle,
            postText,
            postId: post._id
          },
        });
        console.log(data)
  }

    const handleDelete = async () =>{
        const { data } = await deletePost({
            variables:  {postId: post._id, userId: loggedInUser._id },
          });
          console.log(data)
    }
  return (
    <div className='border-warning bg-dark text-white w-50 m-3 p-3'>
        <h2>{post.postTitle}</h2>
        <p>{post.postText}</p>
        <small>{post.postedBy.username}</small>
        <br />
        {post.postedBy._id === loggedInUser._id && <button className='btn btn-danger mt-2' onClick={handleDelete}>Delete</button>}
        {post.postedBy._id === loggedInUser._id && <> <Button variant="primary" onClick={handleShow} className="mt-5 btn btn-success">
        Edit
      </Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" >
            <div className='d-flex flex-column'>
            <input type="text" placeholder='Title' name='postTitle' onChange={(e) => setPostTitle(e.target.value)}  value={postTitle}/>
           <textarea name="postText" id="" cols="30" rows="10" placeholder='Content'  onChange={(e)=> setPostText(e.target.value)} value={postText}></textarea>
           </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      </>}
    </div>
  )
    }
}

export default PostCard