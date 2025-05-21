// Screen/ProjectDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProjectDetailScreen({ route }: any) {
  const { projectId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Detail</Text>
      <Text>ID: {projectId}</Text>
      {/* Có thể load thêm dữ liệu dựa vào ID này */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});
