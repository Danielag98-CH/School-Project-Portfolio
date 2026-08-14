// import { Stack } from 'expo-router'
// import { StyleSheet } from 'react-native'

// const NewsLayout = () => {
//   return (
//     <Stack screenOptions={{
//       headerStyle: {backgroundColor:'green'},
//       headerTintColor: 'white',
//       /*headerShown: false*/
//     }}>
//       <Stack.Screen name="index" options={{title:" News Home"}} />
//       <Stack.Screen name="sports" options={{title:"Sports Screen"}} />
//       <Stack.Screen name="weather" options={{title:"Weather Screen"}} />
//     </Stack>
//   )
// }

// export default NewsLayout

// const styles = StyleSheet.create({})

import { Tabs } from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../../Theme";

export default function NewsLayout(){
  return (
    <Tabs screenOptions={{headerShown: true}}>
      <Tabs.Screen
        name="index"                                 
        options={{
          title: "NEWS",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "newspaper" : "newspaper-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
      <Tabs.Screen
        name="sports"
        options={{
          title: "SPORTS",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "newspaper" : "newspaper-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
      <Tabs.Screen
        name="weather"
        options={{
          title: "WEATHER",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "newspaper" : "newspaper-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
    </Tabs>
  )
}