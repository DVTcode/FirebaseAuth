// app/(auth)/login.tsx
import { auth } from '@/Config/firebaseConfig';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('✅ Đăng nhập thành công!');
      // Điều hướng về trang chính (tabs)
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('❌ Lỗi đăng nhập', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text
       style={styles.forgot}
       onPress={() => router.push('/(auth)/forgot-password')}
     >
       Quên mật khẩu?
     </Text>
      <Text style={styles.switchText}>
        Chưa có tài khoản?{' '}
        <Text style={styles.link} onPress={() => router.push('/(auth)/signup')}>
          Đăng ký
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  forgot: {
  marginTop: 12,
  textAlign: 'center',
  color: '#3478f6',
  fontWeight: '600'
},
  link: {
    color: '#3366FF',
    fontWeight: 'bold',
  },
});
