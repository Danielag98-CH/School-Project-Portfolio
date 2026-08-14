import axios from "axios";

const BASE_URL="https://newsapi.org/v2/everything";

export async function getNews(topic) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: topic,
        apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,
        pageSize: 50
      }
    });
    console.log(response.data);
    return response.data.articles
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}