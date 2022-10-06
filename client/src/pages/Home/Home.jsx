import React from 'react'
import { ALL_POSTS } from "../../utils/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

export default function Home() {
    const { loading, data } = useLazyQuery(ALL_POSTS);

    // const posts = data?.allPosts
    if(!loading){
    console.log(data)
    }
  return (
    <div>Home</div>
  )
}
