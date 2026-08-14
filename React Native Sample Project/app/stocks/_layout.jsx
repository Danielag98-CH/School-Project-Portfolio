import { Tabs } from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../../Theme";

export default function StocksLayout(){
  return (
    <Tabs screenOptions={{headerShown: true}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "STOCKS",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "bar-chart" : "bar-chart-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
      <Tabs.Screen
        name="nasdaq"
        options={{
          title: "NASDAQ",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "bar-chart" : "bar-chart-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
      <Tabs.Screen
        name="nyse"
        options={{
          title: "NYSE",
          tabBarIcon: ({focused}) => <Ionicons name={focused? "bar-chart" : "bar-chart-outline"} size={24} color={focused ? Colors.primary : Colors.secondary} />}}/>
    </Tabs>
  )
}