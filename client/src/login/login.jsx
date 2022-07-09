import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <input type="text" placeholder='email' />
      <input type="text" placeholder='password' />
    </View>
  )
}

export default login

const styles = StyleSheet.create({})