import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>Stocks</Text>

      <Link href="/">Home</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})