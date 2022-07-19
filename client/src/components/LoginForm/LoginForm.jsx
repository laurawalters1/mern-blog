// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// mutations/queries
import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  })

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event)=>{
    event.preventDefault()

    try {
      console.log(userFormData)
      const { data } = await loginUser({
        variables:  {...userFormData },
      });
      console.log("done")
      Auth.login(data.loginUser.token);
     
    } catch (err) {
      alert(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  }

  return (
    <>

      <form action="" onSubmit={handleFormSubmit}>
      <input type="text" placeholder='email' name='email' onChange={handleUserInput}/>
      <input type="text" placeholder='password' name='password' onChange={handleUserInput} />
      <button>Submit</button>
      </form>
    </>
  )
}

export default LoginForm

