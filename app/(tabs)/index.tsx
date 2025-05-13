import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Card, FAB, Text } from 'react-native-paper';

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function HomeScreen() {
  const [services] = useState<Service[]>([
    { id: '1', name: 'Chăm sóc da mặt và dưỡng ẩm tự nhiên', price: 250000 },
    { id: '2', name: 'Gội đầu dưỡng sinh trung hoa', price: 150000 },
    { id: '3', name: 'Lột mụn', price: 40000 },
    { id: '4', name: 'Gội đầu dưỡng sinh trọn gói tất cả dịch vụ', price: 400000 },
    { id: '5', name: 'Dịch vụ rửa mặt', price: 100000 },
    { id: '6', name: 'Dịch vụ đánh răng', price: 50000 }
  ]);

  const renderItem = ({ item }: { item: Service }) => (
    <Card style={styles.card} onPress={() => router.push(`/services/${item.id}`)}>
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium">{item.name}</Text>
        <Text>{item.price.toLocaleString()} đ</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Vĩnh Toàn" />
      </Appbar.Header>
      <View style={styles.listHeader}>
        <Text variant="titleMedium">Danh sách dịch vụ</Text>
        <FAB icon="plus" small onPress={() => router.push('/services/add')} />
      </View>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  list: { paddingHorizontal: 8, paddingBottom: 16 },
  card: { marginVertical: 4, marginHorizontal: 8 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' }
});