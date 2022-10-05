// import { StyleSheet, Text, View } from 'react-native' 
import React, {useState} from 'react'
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
    MyPosts
  } from "../../components";
  import Modal from 'react-bootstrap/Modal';
  import Button from 'react-bootstrap/Button';

import { GET_ME } from "../../utils/queries";


const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 // Execute the query on component load
 const { loading, data, error } = useQuery(GET_ME);
    const me = data?.me || []
    if(error){
        console.log(error)
    }
    if(!loading){
        console.log('hello')
    console.log(me.posts)
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
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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