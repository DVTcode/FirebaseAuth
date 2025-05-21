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
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useTheme } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: any;
}

interface Project {
  id: string;
  name: string;
  status: string;
  ownerId: string;
  createdAt?: string;
}

export default function HomeScreen({ navigation }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const styles = createStyles(isDark);
  const isFocused = useIsFocused();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddProject')}>
          <Ionicons name="add-circle" size={28} color="#f06292" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const list: Project[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'No name',
            status: data.status || 'Unknown',
            ownerId: data.ownerId || 'Unknown',
            createdAt: data.createdAt?.toDate?.().toLocaleDateString() || 'N/A',
          };
        });
        setProjects(list);
      } catch (error) {
        console.error('❌ Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      setLoading(true);
      fetchProjects();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROJECT MANAGER</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f06292" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
            >
              <View style={styles.projectBox}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectStatus}>Status: {project.status}</Text>
                <Text style={styles.projectOwner}>Owner: {project.ownerId}</Text>
                <Text style={styles.projectDate}>Created: {project.createdAt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
        <View style={{ height: 10 }} />
        <Button title="Logout" onPress={handleLogout} color="#d32f2f" />
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
    projectBox: {
      backgroundColor: isDark ? '#333' : '#f9f9f9',
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    projectName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
    },
    projectStatus: {
      marginTop: 4,
      fontSize: 14,
      color: isDark ? '#ccc' : '#666',
    },
    projectOwner: {
      marginTop: 2,
      fontSize: 13,
      color: '#999',
    },
    projectDate: {
      fontSize: 12,
      color: '#aaa',
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: '#ddd',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
  });
