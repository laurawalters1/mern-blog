// import { StyleSheet, Text, View } from 'react-native' 
import React from 'react'
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { GET_ME } from "../../utils/queries";


const Dashboard = () => {

 // Execute the query on component load
 const { loading, data, error } = useQuery(GET_ME);
    const me = data?.me || []
    if(!loading){
        console.log('hello')
    console.log(me)
    }
  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard

// const styles = StyleSheet.create({})