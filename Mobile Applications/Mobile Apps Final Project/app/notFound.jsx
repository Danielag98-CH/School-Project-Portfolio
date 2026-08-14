import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFound() {
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        404 - Page Not Found
      </Text>

      <Text>The page you are looking for does not exist.</Text>

      <Link href="/">
        <Text style={{ color: 'blue', marginTop: 12 }}>
          Go to Homepage
        </Text>
      </Link>
    </View>
  );
}