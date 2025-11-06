import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Shiga cikin app
  const handleLogin = () => {
    if (email && password) {
      setCurrentScreen('home');
      Alert.alert('Nasara', 'An shiga cikin Temaka App!');
    } else {
      Alert.alert('Kuskure', 'Don Allah cika email da password');
    }
  };

  // Yi rijista
  const handleRegister = () => {
    if (username && email && password) {
      setCurrentScreen('home');
      Alert.alert('Nasara', 'An yi rijista!');
    } else {
      Alert.alert('Kuskure', 'Don Allah cika duk filayen');
    }
  };

  // Ƙirƙira sabon post
  const createPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        content: newPost,
        likes: 0,
        comments: [],
        timestamp: new Date().toLocaleTimeString()
      };
      setPosts([post, ...posts]);
      setNewPost('');
      Alert.alert('Nasara', 'An buga post!');
    }
  };

  // Yi like post
  const likePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Fitilar Shiga
  if (currentScreen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Temaka App</Text>
        <Text style={styles.subtitle}>Shiga cikin zumuntar mu</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Shiga</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('register')}>
          <Text style={styles.link}>Ba ku da account? Yi rijista</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Fitilar Rijista
  if (currentScreen === 'register') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Yi Rijista</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Yi Rijista</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('login')}>
          <Text style={styles.link}>Kuna da account? Shiga</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Fitilar Fakiti (Home)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Temaka - Fakiti</Text>
        <Text>Barka da zuwa! 👋</Text>
      </View>

      {/* Ƙirƙiran sabon post */}
      <View style={styles.createPost}>
        <TextInput
          style={styles.input}
          placeholder="Faɗi abin da ke kan zuciyar ku..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity style={styles.postButton} onPress={createPost}>
          <Text style={styles.postButtonText}>Buga Post</Text>
        </TouchableOpacity>
      </View>

      {/* List na post */}
      <Text style={styles.sectionTitle}>Sabbin Post ({posts.length})</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.postFooter}>
              <TouchableOpacity onPress={() => likePost(item.id)}>
                <Text>👍 Like ({item.likes})</Text>
              </TouchableOpacity>
              <Text>💬 Comment (0)</Text>
              <Text>🕒 {item.timestamp}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text>🏠 Fakiti</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => Alert.alert('Rukunoni', 'Za a ƙara nan gaba!')}>
          <Text>👥 Rukunoni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => Alert.alert('Kasuwa', 'Za a ƙara nan gaba!')}>
          <Text>🛒 Kasuwa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentScreen('login')}>
          <Text>🚪 Fita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1877f2',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#1877f2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#1877f2',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  createPost: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#1877f2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  footerButton: {
    padding: 10,
  },
});
