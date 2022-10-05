// import { StyleSheet, Text, View } from 'react-native' 
import React, {useState} from 'react'
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
    MyPosts
  } from "../../components";
  import Modal from 'react-bootstrap/Modal';
  import Button from 'react-bootstrap/Button';

import { GET_ME } from "../../utils/queries";
import { ADD_POST } from '../../utils/mutations';


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [addPost, {error}] = useMutation(ADD_POST)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 // Execute the query on component load
 const { loading, data } = useQuery(GET_ME);
    const me = data?.me || []
    if(error){
        console.log(error)
    }
    if(!loading){
        console.log('hello')
    console.log(me.posts)
    }

    const [postFormData, setPostFormData] = useState({
      postText: '',
      postTitle: '',
    });

    const handleUserInput = (event) => {
      const { name, value } = event.target;
      setPostFormData({ ...postFormData, [name]: value });
    };

    const handleSubmit = async () =>{
      const { data } = await addPost({
          variables:  {...postFormData},
        });
        console.log(data)
  }
 

    const {username, email, posts, followers, following} = me
    console.log('posts', posts)
    if(!loading){
  return (
    <>
      <h1>Hey {username}!</h1>
 
    <Button variant="primary" onClick={handleShow} className="btn btn-success">
        New Post
      </Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" >
            <div className='d-flex flex-column'>
            <input type="text" placeholder='Title' name='postTitle' onChange={handleUserInput} />
           <textarea name="postText" id="" cols="30" rows="10" placeholder='Content' onChange={handleUserInput}></textarea>
           </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <MyPosts posts={posts} />
    </>
  )
    }
}

export default Dashboard

// const styles = StyleSheet.create({})