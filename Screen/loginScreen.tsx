import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const styles = createStyles(isDark);

  // 👇 Cấu hình Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: '623676313958-i1l9v87cjhpatql9hfnbimf4nm31biv3.apps.googleusercontent.com',
  redirectUri: AuthSession.makeRedirectUri({
  }),
});

  useEffect(() => {
    const loadSavedEmail = async () => {
      const saved = await AsyncStorage.getItem('rememberedEmail');
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    };
    loadSavedEmail();
  }, []);

  // 👇 Xử lý khi response Google trả về
  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success' && response.authentication) {
        const idToken = response.authentication.idToken;
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
        navigation.replace('Home');
      }
    };
    handleGoogleResponse();
  }, [response]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (remember) {
        await AsyncStorage.setItem('rememberedEmail', email);
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
      }
      navigation.replace('Main');
    } catch (error: any) {
      let message = 'Đăng nhập thất bại';
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        message = 'Bạn đã nhập sai tài khoản hoặc mật khẩu';
      }
      Alert.alert('Lỗi', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 24,
  color: isDark ? '#fff' : '#000'
}}>
  Đăng nhập
</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={isDark ? '#ccc' : '#888'}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        onSubmitEditing={handleLogin}
      />

      {/* Ghi nhớ tài khoản */}
      <TouchableOpacity
        onPress={() => setRemember(!remember)}
        style={styles.checkboxContainer}
      >
        <View style={[styles.checkbox, remember && styles.checkedBox]} />
        <Text style={styles.checkboxLabel}>Ghi nhớ tài khoản</Text>
      </TouchableOpacity>

      <Button title="Đăng nhập" onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button
        title="CHƯA CÓ TÀI KHOẢN? ĐĂNG KÝ"
        onPress={() => navigation.navigate('Register')}
        color="#2196f3"
      />
      <View style={{ marginTop: 10 }} />
      <Button
        title="Đăng nhập với Google"
        onPress={() => promptAsync()}
        color="#db4437"
        disabled={!request}
      />
      <View style={{ marginTop: 10 }} />
      <Button title="ĐỔI GIAO DIỆN" onPress={toggleTheme} color="#9c27b0" />
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 12,
      padding: 10,
      borderRadius: 5,
      color: isDark ? '#fff' : '#000',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#f06292',
      marginRight: 8,
    },
    checkedBox: {
      backgroundColor: '#f06292',
    },
    checkboxLabel: {
      color: isDark ? '#fff' : '#000',
    },
  });
