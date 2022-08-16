// import { StyleSheet, Text, View } from 'react-native' 
import React from 'react'
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
    MyPosts
  } from "../../components";

import { GET_ME } from "../../utils/queries";


const Dashboard = () => {

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
      <MyPosts posts={posts} />
    </>
  )
    }
}

export default Dashboard

// const styles = StyleSheet.create({})