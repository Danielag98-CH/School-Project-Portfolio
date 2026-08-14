import { StyleSheet, Text, FlatList, Pressable, Linking} from 'react-native' 
import { useEffect, useState } from 'react'
import { getNews } from '../../api/news-api'
import CustomView from '../../components/CustomScreen'
import Spacer from '../../components/Spacer'

const Sports = () => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    // Fetch sports news articles
    getNews('sports').then((sportsArticles) => {
      setArticles(sportsArticles)
    })
  }, [])

  const gotoArticle =  async (url) => {   
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.log("Unable to open URI: " + url);
    }

  }

  return (
    <CustomView style={{padding: 20}}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Pressable key={item.index} onPress={() => gotoArticle(item)}>
            <Text style={{width: '100%',textAlign: 'left'}}>{item.title}</Text>
            <Spacer height={10} />
          </Pressable>
        )}
      />
    </CustomView>
  )
}

export default Sports

const styles = StyleSheet.create({})