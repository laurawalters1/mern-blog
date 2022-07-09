import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const signup = () => {
  return (
    <View>
      <Text>signup</Text>
      <form action="">
      <input type="text" placeholder='email' />
      <input type="text" placeholder='username' />
      <input type="text" placeholder='password' />
      </form>
    </View>
  )
}

export default signup

const styles = StyleSheet.create({})