import React from 'react'
import { ALL_POSTS } from "../../utils/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

export default function Home() {
    const { loading, data } = useQuery(ALL_POSTS);

    if(!loading){
        console.log("loading: ", loading)
        console.log("data: ", data)
    }
  return (
    <div>Home</div>
  )
}
