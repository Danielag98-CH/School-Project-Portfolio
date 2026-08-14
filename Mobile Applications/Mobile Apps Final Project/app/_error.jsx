import { View, Text } from 'react-native';

export default function ErrorScreen({ error }) {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Something went wrong
      </Text>
      <Text>{error?.message}</Text>
    </View>
  );
}