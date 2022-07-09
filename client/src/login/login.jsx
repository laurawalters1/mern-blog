import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <form action="">
      <input type="text" placeholder='email' />
      <input type="text" placeholder='password' />
      </form>
    </View>
  )
}

export default login

const styles = StyleSheet.create({})