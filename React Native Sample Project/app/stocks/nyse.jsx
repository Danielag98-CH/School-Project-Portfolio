import { Pressable, StyleSheet, Text, View } from 'react-native'   
import {useState} from 'react'
import {getQuote} from '../../api/stock-api'
import { TextInput } from 'react-native-web'
import CustomButton from '../../components/CustomButton'
import CustomScreen from '../../components/CustomScreen'
import CustomText from '../../components/CustomText'
import Spacer from '../../components/Spacer'  

const nyse = () => {
  const [symbol, setSymbol] = useState('')
  const [quote, setQuote] = useState(null)
  const [quoteList, setQuoteList] = useState([]) 


  const handleGetQuote = async () => {  
    if (!symbol) return

    // check to see if we already have this symbol in quoteList
    const cachedSymbol = quoteList.find(q => q["01. symbol"] === symbol)

    if(cachedSymbol) {
      setQuote(cachedSymbol)
      return
    }else{
      const response = await getQuote(symbol)
      setQuote(response)
      setQuoteList([...quoteList, response])
    }
  }

  return (
    <CustomScreen>
      {quote && (
        <View>
          <CustomText title>Symbol: {quote["01. symbol"]}</CustomText>
          <CustomText>Open: {quote["02. open"]}</CustomText>
          <CustomText>High: {quote["03. high"]}</CustomText>
          <CustomText>Low: {quote["04. low"]}</CustomText>
          <CustomText>Close: {quote["05. price"]}</CustomText>
        </View>
      )}
      <TextInput
        placeholder="Enter stock symbol"
        onChange={(e) => setSymbol(e.target.value)}
        style={styles.input}
      />
      <CustomButton onPress={handleGetQuote}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}} >
          Get Quote
        </Text>
      </CustomButton>

      {/* {quote && (<Text>{JSON.stringify(quote)}</Text>)} */}

      <Spacer height={25} />
      {quoteList.length > 0 && (
        <View>
          <Text>Quote History:</Text>
          {quoteList.map((q, index) => (
            <View key={index}>
              <Pressable onPress={() => setQuote(q)}>
                <CustomText title>
                  {q["01. symbol"]}
                </CustomText>
              </Pressable>
            </View>
          ))}
        </View>
      )}


    </CustomScreen>
  )
}

export default nyse

const styles = StyleSheet.create({
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  listItem:{
    fontSize: 16,
    padding: 5,
  }
})