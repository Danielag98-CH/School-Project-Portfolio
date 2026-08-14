import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import CustomScreen from '../../components/CustomScreen'
import CustomButton from '../../components/CustomButton'
import {Ionicons} from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import {Colors} from '../../Theme'

const Home = () => {

  const router = useRouter()

  return (
    <CustomScreen>
      <Ionicons size={150} name="newspaper-outline" color={Colors.secondary}/>
      <Spacer height={35} />
      <View style={{width:'80%'}}>
        <CustomButton onPress={() => router.replace('/news/sports')}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Sports</Text>
        </CustomButton>
        <Spacer height={20} />
        <CustomButton onPress={() => router.replace('/news/weather')}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Weather</Text>
        </CustomButton>
      </View>
    </CustomScreen>
  )
}

export default Home

const styles = StyleSheet.create({})