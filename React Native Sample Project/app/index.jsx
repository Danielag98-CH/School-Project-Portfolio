import { StyleSheet, Text, View, Button } from 'react-native'
import {Link} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'  
import {Colors} from '../Theme'   
import { showAlert, showConfirm } from '../alerts';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>

      <Ionicons size={150} name="moon" color={Colors.accent} />

      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/news">News</Link>
      <Link href="/stocks">Stocks</Link>
      <Link href="/books">Books</Link>

      <Button title="Submit" onPress={() => showAlert('Button pressed!')} />
      
      <Button title="Submit" onPress={() => showConfirm('Button pressed!')} />
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})