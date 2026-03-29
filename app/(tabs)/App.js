import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [page, setPage] = useState('login'); 

  const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
      console.log("Login Data:", data);
      setPage('home'); 
    };

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        
        <Controller control={control} name="email" rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Email" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Controller control={control} name="password" rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <Button title="Login" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.link} onPress={() => setPage('register')}>Don't have an account? Register</Text>
      </View>
    );
  };


  const Register = () => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const onSubmit = (data) => {
      console.log("Register Data:", data);
      setPage('setup'); 
    };

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        
        <Controller control={control} name="email" rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Email" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Controller control={control} name="password" rules={{ 
          required: "Password is required", 
          minLength: { value: 6, message: "Min 6 characters" } 
        }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <Controller control={control} name="confirmPassword" 
          rules={{ validate: value => value === password || "Passwords do not match" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

        <Button title="Register" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.link} onPress={() => setPage('login')}>Already have an account? Login</Text>
      </View>
    );
  };


  const AccountSetup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
      console.log("Setup Data:", data);
      setPage('home'); 
    };

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Account Setup</Text>
        
        <Text style={{color: 'black', marginBottom: 5}}>Profile Photo:</Text>
        <TextInput style={styles.input} placeholder="Photo URL or Placeholder" placeholderTextColor="#888" />

        <Controller control={control} name="firstName" rules={{ required: "First Name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="First Name" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

        <Controller control={control} name="lastName" rules={{ required: "Last Name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Last Name" onChangeText={onChange} value={value} placeholderTextColor="#888" />
          )}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

        <Button title="Complete Setup" onPress={handleSubmit(onSubmit)} />
      </View>
    );
  };


  const Homepage = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome to Homepage!</Text>
      <Button title="Logout" onPress={() => setPage('login')} color="red" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {page === 'login' && <Login />}
        {page === 'register' && <Register />}
        {page === 'setup' && <AccountSetup />}
        {page === 'home' && <Homepage />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0'
  },
  scroll: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  card: {
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: 'black' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 5, 
    color: 'black', 
    backgroundColor: '#fff' 
  },
  error: { 
    color: 'red', 
    fontSize: 12, 
    marginBottom: 10,
    marginLeft: 5
  },
  link: { 
    color: 'blue', 
    marginTop: 20, 
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});