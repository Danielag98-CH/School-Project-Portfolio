
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Slot } from 'expo-router'
import { Stack } from 'expo-router'
import {Ionicons} from '@expo/vector-icons'

const RootLayout = () => {
  return (
    <Stack screenOptions={{
        headerStyle: {backgroundColor:'olive'},
        headerTintColor: 'white'
        }}>

      <Stack.Screen name="index" options={{title:"Home", headerBackVisible: false, headerLeft: () => null}} /> 
      <Stack.Screen name="about" options={{title:"About"}} />
      <Stack.Screen name="contact" options={{title:"Contact", headerShown: false}} />
      <Stack.Screen name="news" options={{ headerShown: false }} />
      <Stack.Screen name="stocks" options={{ headerShown: false }} />
      <Stack.Screen name="books/index" options={{ title: "Books"}} />
      <Stack.Screen name="books/[id]" options={{ title: "Book Details"}} />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})