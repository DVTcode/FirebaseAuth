// AddProjectScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

interface Props {
  navigation: any;
}

export default function AddProjectScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    try {
      await addDoc(collection(db, 'projects'), {
        name,
        description,
        createdAt: serverTimestamp(),
        status: 'active',
        ownerId: auth.currentUser?.uid || 'unknown',
      });
      Alert.alert('✅ Success', 'Project added!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('❌ Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe the project..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Project" onPress={handleAdd} color="#f06292" />
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
