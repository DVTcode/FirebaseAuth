import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function ServiceDetailScreen({ route, navigation }: any) {
  const { id, name: initialName, price: initialPrice } = route.params;
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(String(initialPrice));

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'services', id);
      await updateDoc(docRef, {
        name,
        price: parseInt(price),
      });
      Alert.alert('✅ Cập nhật thành công');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('❌ Lỗi cập nhật', error.message);
    }
  };

  const handleDelete = () => {
  Alert.alert(
    'Xác nhận xóa',
    'Bạn có chắc chắn muốn xóa dịch vụ này?',
    [
      {
        text: 'Không',
        style: 'cancel',
      },
      {
        text: 'Có',
        style: 'destructive',
        onPress: async () => {
          try {
            const docRef = doc(db, 'services', id);
            await deleteDoc(docRef);
            Alert.alert('🗑️ Đã xóa dịch vụ');
            navigation.goBack();
          } catch (error: any) {
            Alert.alert('❌ Lỗi xóa', error.message);
          }
        },
      },
    ],
    { cancelable: true }
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên dịch vụ</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Giá (VND)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="💾 Cập nhật dịch vụ" onPress={handleUpdate} />
      <View style={{ height: 10 }} />
      <Button title="🗑️ Xóa dịch vụ" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
