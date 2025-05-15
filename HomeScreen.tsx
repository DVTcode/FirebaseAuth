import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { auth, db } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useTheme } from './ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: any;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function HomeScreen({ navigation }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const styles = createStyles(isDark);
  const isFocused = useIsFocused();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
          <Ionicons name="add-circle" size={28} color="#f06292" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'services'));
        const list: Service[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const name = data.name || 'Không tên';
          const price = Number(data.price);
          return {
            id: doc.id,
            name,
            price: isNaN(price) ? 0 : price,
          };
        });
        setServices(list);
      } catch (error) {
        console.error('❌ Lỗi khi tải dịch vụ:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      setLoading(true);
      fetchServices();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>VINH TOAN SPA</Text>
      </View>

      {/* Body */}
      {loading ? (
        <ActivityIndicator size="large" color="#f06292" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {services.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('ServiceDetail', item)}
            >
              <View style={styles.serviceBox}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>
                  {item.price.toLocaleString('vi-VN')} ₫
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Button title="Đổi Theme" onPress={toggleTheme} />
        <View style={{ height: 10 }} />
        <Button title="Đăng xuất" onPress={handleLogout} color="#d32f2f" />
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    header: {
      paddingTop: 50,
      paddingBottom: 20,
      backgroundColor: '#f06292',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
    },
    scrollContent: {
      padding: 16,
    },
    serviceBox: {
      backgroundColor: isDark ? '#333' : '#f9f9f9',
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceName: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? '#fff' : '#000',
    },
    servicePrice: {
      marginTop: 4,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#999',
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: '#ddd',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
  });
