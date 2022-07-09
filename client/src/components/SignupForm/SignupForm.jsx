// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Auth from '../../utils/auth';

// mutations/queries
import { ADD_USER } from '../../utils/mutations';

const SignupForm = () => {
  return (
    <>
      <form action="">
      <input type="text" placeholder='email' />
      <input type="text" placeholder='username' />
      <input type="text" placeholder='password' />
      <button>Submit</button>
      </form>
    </>
  )
}

export default SignupForm

