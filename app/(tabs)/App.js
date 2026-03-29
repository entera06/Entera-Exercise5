import React, { createContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const ThemeContext = createContext();

export default function App() {
  const [page, setPage] = useState('login'); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    background: isDarkMode ? '#121212' : '#f0f0f0',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    inputBorder: isDarkMode ? '#333' : '#ccc',
    inputBg: isDarkMode ? '#2c2c2c' : '#ffffff',
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => setPage('home');

    return (
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>
        <Controller control={control} name="email" rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Email" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        <Controller control={control} name="password" rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.link} onPress={() => setPage('register')}>Go to Register</Text>
      </View>
    );
  };

  const Register = () => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const onSubmit = () => setPage('setup');

    return (
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Register</Text>
        <Controller control={control} name="email" rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Email" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        <Controller control={control} name="password" rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        <Controller control={control} name="confirm" rules={{ validate: v => v === password || "Match fail" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Confirm" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.link} onPress={() => setPage('login')}>Back to Login</Text>
      </View>
    );
  };

  const AccountSetup = () => {
    const { control, handleSubmit } = useForm();
    return (
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Account Setup</Text>
        <Controller control={control} name="firstName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="First Name" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        <Controller control={control} name="lastName" rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} 
              placeholder="Last Name" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        <Button title="Complete" onPress={handleSubmit(() => setPage('home'))} />
      </View>
    );
  };

  const Homepage = () => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>Homepage</Text>
      <View style={styles.themeSwitchContainer}>
        <Text style={{ color: theme.text }}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <Button title="Logout" onPress={() => setPage('login')} color="red" />
    </View>
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {page === 'login' && <Login />}
          {page === 'register' && <Register />}
          {page === 'setup' && <AccountSetup />}
          {page === 'home' && <Homepage />}
        </ScrollView>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { padding: 20, borderRadius: 10, elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
  themeSwitchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 }
});