// AddServiceScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Props {
  navigation: any;
}

export default function AddServiceScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !price) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      await addDoc(collection(db, 'services'), {
        name,
        price: Number(price),
      });
      Alert.alert('✅ Thành công', 'Đã thêm dịch vụ!');
      navigation.goBack(); // quay lại Home
    } catch (error: any) {
      Alert.alert('❌ Lỗi', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên dịch vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Thêm tên dịch vụ vào đây"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Add" onPress={handleAdd} color="#f06292" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginBottom: 4, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});
