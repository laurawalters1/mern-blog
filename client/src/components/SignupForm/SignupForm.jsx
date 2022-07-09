// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Auth from '../../utils/auth';

// mutations/queries
import { ADD_USER } from '../../utils/mutations';

const SignupForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleUserInput = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });
        Auth.login(data.addUser.token);
      } catch (err) {
        alert(err);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };
  return (

    <>
      <form action="" onSubmit={handleFormSubmit}>
      <input type="text" placeholder='email' name='email' onChange={handleUserInput}/>
      <input type="text" placeholder='username' name='username' onChange={handleUserInput} />
      <input type="password" placeholder='password' name='password' onChange={handleUserInput} />
      <button>Submit</button>
      </form>
    </>
  )
}

export default SignupForm

